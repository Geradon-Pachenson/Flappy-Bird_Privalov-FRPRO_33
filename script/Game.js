import Config from "./config.js"
import Bird from "./Bird.js"
import Background from "./Background.js"
import Pipe from "./Pipe.js"
import CanvasDrawEngine from "./CanvasDrawEngine.js"
import PhysicsEngine from "./PhysicsEngine.js"
import MouseInputHandler from "./inputHandler.js"


class Game {
    constructor() {
        this._config = new Config();
        this._bird = new Bird();
        this._bg = new Background();
        this._pipe = new Pipe();
        this._drawEngine = new CanvasDrawEngine();
        this._physicsEngine = new PhysicsEngine();

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
        this._config.increaseInd(); // Увеличиваем индекс на каждом кадре

        // Пересчитываем координату по оси X фонового изображения
        const backgroudX = -((this._config.index * this._config.SPEED) % 1900);

        const bgPartOneResult = {
            x: backgroudX + 1899,
        };

        // вторая часть фонового изображения, которая
        // идёт следом за первой
        const bgPartTwoResult = {
            x: backgroudX,
        };

        // Пересчитываем координату по оси X птицы
        // из изображения-источника
        const frames = {
            x: Math.floor((this._config.index % 196) / 14) * 194,
        }

        //Пересчитываем координату по оси Y  отображения птицы на canvas
        this._physicsEngine.updateBird(this._physicsEngine.angle);
        
        // Запускаем функцию отрисовки верхней части фона
        this._bg.drawBg(bgPartOneResult, bgPartTwoResult);

        // Запускаем функцию отрисовки птицы
        this._bird.draw(frames, this._physicsEngine.y, this._physicsEngine.angle);

        // Запускаем функцию отрисовки труб
        this._pipe.draw();

        // Запускаем функцию отрисовки нижней части фона
        this._bg.drawFg(bgPartOneResult, bgPartTwoResult);

        console.log(this._pipe.pipe[0].x)
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

    // //Метод окончания игры
    // gameOver() {
    //     alert(`Вы проиграли! Ваши очки: ${this._score}`);
    // }
}

export default Game;
