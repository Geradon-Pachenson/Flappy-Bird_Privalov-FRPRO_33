import Config from "./config.js"

class Game {
    constructor() {
        this._config = new Config();
        // инициализируем canvas, получаем его ширину и высоту из config
        this._canvas = document.getElementById(this._config.canvas.id);
        this._ctx = canvas.getContext("2d");
        this._canvas.width = this._config.canvas.width;
        this._canvas.height = this._config.canvas.height;

        //Устанавливаем высоту и ширину игры = высоте и ширине canvas
        this.width = this._config.canvas.width;
        this.height = this._config.canvas.height;

        //Создаем загрузчик spriteSheet
        this._resourceLoader = new ResourceLoader();
        this._physicsEngine = ...;
        this._drawEngine = ...;

        
        
    }
}
//Асинхронный метод подготовки к игре
async prepare() {
    this._spriteSheet = this._resourceLoader.load({
        type: RASOURCES_TYPE.IMAGE,
        src: this._config.spriteSheet.src,
        widht: this._config.spriteSheet.widht,
        height: this._config.spriteSheet.height,
    });
}

//Метод обновления состояния игры. Создаем наши сущности
reset() {
    //Обнуляем колличество очков
    this._score = 0;
    this._bird = new Bird() {
            x: this._config.bird.x,
            y: this._config.bird.y,
            width: this._config.bird.widht,
            height: this._config.bird.height,
            frames: this._config.bird.frames,
            spriteSheet: this._spriteSheet,
            flapSpeed: this._config.bird.flapSpeed,
            physicsEngine: this._physicsEngine,
            drawEngine: this._drawEngine,
            game: this,
        }
}

//Метод обновления сущностей при каждом такте
update(delta) {
    //Вызывем метод обновления птицы
    this._bird.update(delta);
}

//Метод отрисовки всего что посчитали. Так же задаем порядок отриосвки. 
draw() {
    this._bird.draw();
}

//Метод запуска игры
start() {
    //Получаем текущее время
    const now = Date.now();
    //Получаем дельту - разницу между текущим моментов времени и временем последнего обновления star = this._lastUpdate.
    //Взывисимости от дельты мы будем обновлять состояние - чем больше времени прошло тем дальше ушли события игры.
    //На дельту будем перемножать наше перемещения. Прокидываем ее в update() 
    const delta = this._lastUpdate - now;
    this.reset();
    this.update(delta);
    //Прежде чем отрисовывать, зачищаем предыдущие отрисовки
    this._drawEngine.clear();
    this.draw();

    //Запускаем метод анимирования, перезапускающий метод start. Биндим, чтобы не потерять this.
    //Также requestAnimationFrame передает в start текущее время вызова.
    requestAnimationFrame(this.start.bind(this))
}

//Метод окончания игры
gameOver() {
    alert(`Вы проиграли! Ваши очки: ${this._score}`);
}

export default Game;