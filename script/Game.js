import Bird from "./Entity/Bird.js"
import Background from "./Entity/Background.js"
import Pipe from "./Entity/Pipe.js"
import CanvasDrawEngine from "./Engine/CanvasDrawEngine.js"
import PhysicsEngine from "./Engine/PhysicsEngine.js"
import Sounds from "./sounds.js"
import Score from "./score.js"
import ResultTable from "./resultsTable.js"

class Game {
    constructor() {
        this._config = new Config();
        this._bird = new Bird();
        this._bg = new Background();
        this._pipe = new Pipe();
        this._drawEngine = new CanvasDrawEngine();
        this._physicsEngine = new PhysicsEngine();
        this._sounds = new Sounds();
        this._score = new Score();
        this._resultTable = new ResultTable();

        //Устанавливаем высоту и ширину игры = высоте и ширине canvas
        this._width = this._config.canvas.width;
        this._height = this._config.canvas.height;

        // //Создаем загрузчик spriteSheet
        // this._resourceLoader = new ResourcesLoader();

        this.start();
        
        this.request = 0;
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

    // //Метод обновления состояния игры. Создаем наши сущности
    // reset() {
    //     //Обнуляем колличество очков
    //     this._score = 0;
    //     this._bird = new Bird( {
    //             x: this._config.bird.x,
    //             y: this._config.bird.y,
    //             width: this._config.bird.widht,
    //             height: this._config.bird.height,
    //             frames: this._config.bird.frames,
    //             spriteSheet: this._spriteSheet,
    //             flapSpeed: this._config.bird.flapSpeed,
    //             physicsEngine: this._physicsEngine,
    //             drawEngine: this._drawEngine,
    //             game: this,
    //         })
    // }
    

    //Метод отрисовки всего что посчитали. Так же задаем порядок отриосвки. 
    draw = () => {
        // Запускаем функцию отрисовки верхней части фона
        this._bg.drawBg(this._config.state);

        // Запускаем функцию отрисовки птицы
        this._bird.draw();

        // Запускаем функцию отрисовки труб
        this._pipe.draw(this._config.state);

        // Запускаем функцию отрисовки нижней части фона
        this._bg.drawFg(this._config.state);

        // // Запускаем функцию отрисовки и подсчета очков
        // this._score.draw(this._config.state);

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

        if (delta < this._config.frameDelay) {
        // Если прошло меньше времени, чем задержка между кадрами, ждем оставшееся время
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
        this.animationId = requestAnimationFrame(this._loop);
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
    }

    //Метод окончания игры
    gameOver = () => {
        cancelAnimationFrame(this.animationId);
        this._config.state.current = this._config.state.over;
        //Проигрываем звук крушения
        this._sounds.crashMp3.play();
        
        //Отрисовываем таблицу результатов
        this._resultTable.draw();
    }

}

export default Game;
