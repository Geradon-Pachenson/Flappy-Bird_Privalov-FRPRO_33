import Config from "./config.js"
import Bird from "./Entity/Bird.js"
import Background from "./Entity/Background.js"
import Pipe from "./Entity/Pipe.js"
import CanvasDrawEngine from "./Engine/CanvasDrawEngine.js"
import PhysicsEngine from "./Engine/PhysicsEngine.js"
import Sounds from "./sounds.js"

class Game {
    constructor() {
        this._config = new Config();
        this._bird = new Bird();
        this._bg = new Background();
        this._pipe = new Pipe();
        this._drawEngine = new CanvasDrawEngine();
        this._physicsEngine = new PhysicsEngine();
        this._sounds = new Sounds();

        this.x = this._config.bird.x;
        this.y = this._config.bird.y;

        //Устанавливаем высоту и ширину игры = высоте и ширине canvas
        this._width = this._config.canvas.width;
        this._height = this._config.canvas.height;

        // //Создаем загрузчик spriteSheet
        // this._resourceLoader = new ResourcesLoader();

        // //Создаем физический движок, передаем в него гравитацию.
        // this._physicsEngine = new PhysicsEngine({ gravity: this._config.gravity });

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
    
    // //Метод обновления сущностей при каждом такте
    // update(delta) {
    //     //Вызывем метод обновления птицы
    //     this._bird.update(delta);
    // }

    //Метод отрисовки всего что посчитали. Так же задаем порядок отриосвки. 
    draw = () => {
        this._drawEngine.clear();

        // Запускаем функцию отрисовки верхней части фона
        this._bg.drawBg();

        // Запускаем функцию отрисовки птицы
        this._bird.draw();

        // Запускаем функцию отрисовки труб
        this._pipe.draw();

        // Запускаем функцию отрисовки нижней части фона
        this._bg.drawFg();

        // После завершения расчётов для текущего кадра
        // сразу запускаем выполнение расчётов для следующего 
        window.requestAnimationFrame(this.draw);
    }

    // //Метод цикла
    // _loop() {
    //     //Получаем текущее время
    //     const now = Date.now();
    //     //Получаем дельту - разницу между текущим моментом времени и временем последнего обновления start = this._lastUpdate.
    //     //Взывисимости от дельты мы будем обновлять состояние - чем больше времени прошло тем дальше ушли события игры.
    //     //На дельту будем перемножать наше перемещения. Прокидываем ее в update() 
    //     const delta = this._lastUpdate - now;
    //     this.reset();
    //     this.update(delta);
    //     //Прежде чем отрисовывать, зачищаем предыдущие отрисовки
    //     this._drawEngine.clear();
    //     this.draw();

    //     //Перезаписываем время последнего обновления на текущий момент
    //     this._lastUpdate = now;

    //     //Запускаем метод анимирования, перезапускающий метод start. Биндим, чтобы не потерять this.
    //     //Также requestAnimationFrame передает в start текущее время вызова.
    //     requestAnimationFrame(this.start.bind(this))
    // }

    //Метод запуска игры
    start() {
        this._lastUpdate = Date.now();
        // this._loop();
    }

    //Метод окончания игры
    gameOver() {
        alert(`Вы проиграли! Ваши очки: ${this._score}`);
    }
}

export default Game;
