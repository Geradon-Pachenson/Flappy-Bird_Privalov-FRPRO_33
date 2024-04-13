import Config from "./config.js"
import Bird from "./Bird.js"
import Background from "./Background.js"
import CanvasDrawEngine from "./CanvasDrawEngine.js"
import MouseInputHandler from "./inputHandler.js"


class Game {
    constructor() {
        this._config = new Config();
        this._bird = new Bird();
        this._bg = new Background();
        this._drawEngine = new CanvasDrawEngine();
        
        //Устанавливаем высоту и ширину игры = высоте и ширине canvas
        this._width = this._config.canvas.width;
        this._height = this._config.canvas.height;

        // //Создаем загрузчик spriteSheet
        // this._resourceLoader = new ResourcesLoader();

        // //Создаем физический движок, передаем в него гравитацию.
        // this._physicsEngine = new PhysicsEngine({ gravity: this._config.gravity });

        //Управление птицей мышью. При нажатии на левую кнопку мыши принимаем координаты птицы и запускаем метод bird.flap
        this._inputHandler = new MouseInputHandler({
            left: ({x, y}) => {
                this._bird.flap();
            }
        })
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

        // Запускаем функцию отрисовки фона
        this._bg.draw(bgPartOneResult, bgPartTwoResult);

        // Запускаем функцию отрисовки птицы
        this._bird.draw(frames);

        // После завершения расчётов для текущего кадра
        // сразу запускаем выполнение расчётов для следующего 
        window.requestAnimationFrame(this.draw);
    }

    // //Метод цикла
    // _loop() {
    //     //Получаем текущее время
    //     const now = Date.now();
    //     //Получаем дельту - разницу между текущим моментов времени и временем последнего обновления star = this._lastUpdate.
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

    // //Метод запуска игры
    // start() {
    //     this._inputHandler.subscribe();
    //     this._lastUpdate = Date.now();
    //     this._loop();
    // }

    // //Метод окончания игры
    // gameOver() {
    //     alert(`Вы проиграли! Ваши очки: ${this._score}`);
    // }
}

export default Game;
