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

        this._spriteSheet = ...;
        this._physicsEngine = ...;
        this._drawEngine = ...;

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
}


export default Game;