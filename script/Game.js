import Config from "./config.js";
import ResourcesLoader from "./resources.js";
import ControlInputHandler from "./Engine/inputHandler.js"
import CanvasDrawEngine from "./Engine/CanvasDrawEngine.js"
import Bird from "./Entity/Bird.js"
import Background from "./Entity/Background.js"
import Pipe from "./Entity/Pipe.js"
import PhysicsEngine from "./Engine/PhysicsEngine.js"
import Sounds from "./sounds.js"
import Score from "./score.js"
import ResultTable from "./resultsTable.js"

class Game {
    constructor() {
        this._config = new Config();
        this._resources = new ResourcesLoader();
        this._drawEngine = new CanvasDrawEngine();
        this._sounds = new Sounds({
            config: this._config,
        });
        //Управление птицей мышью. При нажатии на левую кнопку мыши принимаем координаты птицы и запускаем метод bird.flap
        // При нажатии на кнопку клавиатуры просто запускаем метод flap
        this._inputHandler = new ControlInputHandler({
            left: ({x, y}) => {
                // Константы для определения координат клика на canvas
                const {left, top} = canvas.getBoundingClientRect();
                const clickX = x - left;
                const clickY = y - top;

                this._physicsEngine.flap();
                
                //Если игра окончена обрабатываем клик по кнопке start для перезапуска
                if (this._config.state.current === this._config.state.over && 
                (clickX >= 175 && clickX <= 291) &&
                (clickY >= 388 && clickY <= 427)) {
                    this.start();
                };
            },
            Space: () => {
                this._physicsEngine.flap();
            },
        });
        this._physicsEngine = new PhysicsEngine({
            config: this._config,
            sounds: this._sounds,
            inputHandler: this._inputHandler,
        });
        this._bg = new Background({
            config: this._config,
            drawEngine: this._drawEngine,
        });
        this._score = new Score({
            config: this._config,
            drawEngine: this._drawEngine,
        });
        this._bird = new Bird({
            config: this._config,
            drawEngine: this._drawEngine,
            physicsEngine: this._physicsEngine,
        });
        this._pipe = new Pipe({
            config: this._config,
            drawEngine: this._drawEngine,
            physicsEngine: this._physicsEngine,
            score: this._score,
            sounds: this._sounds,
        });
        this._resultTable = new ResultTable({
            config: this._config,
            drawEngine: this._drawEngine,
        });

        this._gameAnimId;
    }

    //Метод отрисовки всего что посчитали. Так же задаем порядок отриосвки. 
    draw = () => {

        // Запускаем функцию отрисовки верхней части фона
        this._bg.drawBg();

        // Запускаем функцию отрисовки птицы
        this._bird.draw();

        // Запускаем функцию отрисовки труб
        this._pipe.draw();

        // Запускаем функцию отрисовки нижней части фона
        this._bg.drawFg();
        
        //Если игра окончена, отрисовываем таблицу результатов
        if (this._config.state.current === this._config.state.over) {
            this._resultTable.draw();
            this._score.drawMedal();
        };

        // Запускаем функцию отрисовки очков
        this._score.draw();

    }

    //Метод цикла
    _loop = () => {
        //Получаем текущее время
        const now = Date.now();
        //Получаем дельту - разницу между текущим моментом времени и временем последнего обновления start = this._lastUpdate.
        //Взывисимости от дельты мы будем обновлять состояние - чем больше времени прошло тем дальше ушли события игры.
        const delta = now - this._lastUpdate;

        // Если прошло меньше времени, чем задержка между кадрами, ждем оставшееся время
        if (delta < this._config.frameDelay) {
            setTimeout(this._loop, this._config.frameDelay - delta);
            return;
        }
        
        //Прежде чем отрисовывать, зачищаем предыдущие отрисовки
        this._drawEngine.clear();

        this.draw();

        // определяем логику столкновения птицы с землёй и трубами, с учетом наклона птицы 
        this.checkFalls();

        //Перезаписываем время последнего обновления на текущий момент
        this._lastUpdate = now;

        //Запускаем метод анимирования, перезапускающий метод start. Биндим, чтобы не потерять this.
        //Также requestAnimationFrame передает в start текущее время вызова.
        this._gameAnimId = requestAnimationFrame(this._loop);
    }

     // определяем логику столкновения птицы с землёй и трубами, с учетом наклона птицы 
    checkFalls = () => {
        //Определяем края труб для создания логики столкновения
        const pipeLeftEdge = this._pipe.pipes[this._pipe.pipes.length - 1].x + this._config.pipe.padding;
        const pipeRightEdge = this._pipe.pipes[this._pipe.pipes.length - 1].x + this._config.bird.birdCoords.width * 2 + this._config.pipe.padding;
        const pipeUpBottomEdge = this._pipe.pipes[this._pipe.pipes.length - 1].y + this._config.pipe.pipeBottom.height + this._config.pipe.padding / 3;
        const pipeDownTopEdge = this._pipe.pipes[this._pipe.pipes.length - 1].y + this._config.pipe.pipeBottom.height + this._pipe.gap + this._config.pipe.padding;

        //Определяем края птицы для создания логики столкновения
        const birdLeftEdge = this._physicsEngine.x;
        const birdRightEdge = this._physicsEngine.x + this._config.bird.birdCoords.width;
        const birdTopEdge = this._bird.y;
        const birdBottomEdge = this._bird.y + this._config.bird.birdCoords.height;

        if ((birdBottomEdge >= this._config.canvas.land + this._config.pipe.padding) ||  // падение на землю
            ((birdRightEdge >= pipeLeftEdge) && //столкновение с трубами
            (birdLeftEdge <= pipeRightEdge) && 
            (birdTopEdge <= pipeUpBottomEdge || birdBottomEdge >= pipeDownTopEdge))) {
            
            // Проигрываем звук крушения если режим игра активен
            if (this._config.state.current === this._config.state.play) {
                this._sounds.crashMp3.play();
            };
            this.gameOver();
        }
    }

    // Функция подготовки к игре
    prepare = () => {
        // Обработчик клика на стартовом экране
        this._drawEngine.canvas.addEventListener('click', (e) => {
            if (!this._drawEngine.canvas || !this._sounds || !this._score || !this._bird || !this._bg || !this._pipe || !this._resultTable) {
                console.error('Переменные не определены.');
                return;
            };
            if (this._config.state.current === this._config.state.ready) {// Начинаем игру, если текущий статус ready
                this.start();
            } 
        });
    }

    //Метод запуска игры
    start() {
        this.reset();
        this._config.state.current = this._config.state.play;
        this._lastUpdate = Date.now();
        this._loop();
    }

     //Метод обновления состояния игры. Создаем наши сущности
    reset() {
        //Обнуляем колличество очков
        this._config.state.current = this._config.state.ready;
        this._score._currentScore = 0;
        this._pipe.reset();
        this._physicsEngine.reset();
        this._config.gravity = 1.6;
        this._config.SPEED = 2;
    }

    //Метод окончания игры
    gameOver = () => {

        this._config.state.current = this._config.state.over;

        this.prepare();
        //Отсанавливаем анимацию
        cancelAnimationFrame(this._gameAnimId);
    }

    //Проверка загрузки ресурсов
    loadAssets() {
        const bgPromise = this._resources.loadImgAsset(this._config.bg.url);
        const fgPromise = this._resources.loadImgAsset(this._config.fg.url);
        const birdPromise = this._resources.loadImgAsset(this._config.bird.url);
        const pipeUpPromise = this._resources.loadImgAsset(this._config.pipe.pipeUpUrl);
        const pipeBottomPromise = this._resources.loadImgAsset(this._config.pipe.pipeBottomUrl);
        const spritePromise = this._resources.loadImgAsset(this._config.sprite.url);
        
        const vzmahPromise = this._resources.loadAudioAsset(this._config.sounds.vzmahSrc);
        const scorePromise = this._resources.loadAudioAsset(this._config.sounds.scoreSrc);
        const crashPromise = this._resources.loadAudioAsset(this._config.sounds.crashSrc);

        return Promise.all([bgPromise, fgPromise, birdPromise, pipeUpPromise, pipeBottomPromise, spritePromise, vzmahPromise, scorePromise, crashPromise])
    }
}

export default Game;
