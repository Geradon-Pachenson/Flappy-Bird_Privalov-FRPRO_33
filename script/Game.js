import Config from "./config.js";
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
        this._drawEngine = new CanvasDrawEngine();
        this._sounds = new Sounds({
            config: this._config,
        });
        this._physicsEngine = new PhysicsEngine({
            config: this._config,
            sounds: this._sounds,
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
        this._bg = new Background({
            config: this._config,
            drawEngine: this._drawEngine,
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

        //Устанавливаем высоту и ширину игры = высоте и ширине canvas
        this._width = this._config.canvas.width;
        this._height = this._config.canvas.height;

        // //Создаем загрузчик spriteSheet
        // this._resourceLoader = new ResourcesLoader();

        this.animationId = 0;
    }

    // Функция подготовки к игре
    prepare() {
        this._bg.drawStartImg();
        // Обработчик клика на стартовом экране
        this._drawEngine.canvas.addEventListener('click', (event) => {
            if (!this._drawEngine.canvas || !this._sounds || !this._score || !this._bird || !this._bg || !this._pipe || !this._resultTable) {
            console.error('Переменные не определены.');
            return;
            }
            
            if (this._config.state.current === this._config.state.getReady) { // Если игра еще не начата, то начать
                this.start();
            } else if (this._config.state.current === this._config.state.game) { // Если игра идет, то обработать клик 
                event.preventDefault();
                handleFlap();
            
            } else if (state.current === state.over && isClickOnStartBtn(clickX, clickY)) { // Если игра окончена, то обработать клик на кнопку "Start"
            resetGame();
            }
        });
    }

    // //Асинхронный метод подготовки к игре
    // async prepare() {
    //     this._spriteSheet = await this._resourceLoader.load({
    //         type: RESOURCES_TYPE.IMAGE,
    //         src: this._config.spriteSheet.src,
    //         width: this._config.spriteSheet.width,
    //         height: this._config.spriteSheet.height,

    //     })
    // }

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

        // определяем логику столкновения птицы с землёй и трубами, с учетом наклона птицы 
        this.checkFalls();
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
        
        // this.reset();
        //Прежде чем отрисовывать, зачищаем предыдущие отрисовки
        this._drawEngine.clear();
        this.draw();

        //Перезаписываем время последнего обновления на текущий момент
        this._lastUpdate = now;

        //Запускаем метод анимирования, перезапускающий метод start. Биндим, чтобы не потерять this.
        //Также requestAnimationFrame передает в start текущее время вызова.
        this.animationId = window.requestAnimationFrame(this._loop.bind(this));
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
            // window.cancelAnimationFrame(this.request);
            this.gameOver();
        }
    }

    //Метод запуска игры
    start() {
        this._config.state.current = this._config.state.game;
        this._lastUpdate = Date.now();
        this._loop();

        if (this._config.btnClick = true) {
            this.restart();
        }
    }

     //Метод обновления состояния игры. Создаем наши сущности
    restart() {
        //Обнуляем колличество очков
        this._score._currentScore = 0;
        this._config.state.current = this._config.state.game;
        this._lastUpdate = Date.now();
        this.prepare();
    }

    //Метод окончания игры
    gameOver = () => {
        window.cancelAnimationFrame(this.animationId);
        this._config.state.current = this._config.state.over;
    
        // Проигрываем звук крушения
        this._sounds.crashMp3.play();

    }

}

export default Game;
