import Config from "./config.js"
import CanvasDrawEngine from "./CanvasDrawEngine.js"

class Background {
    constructor() {
        this._drawEngine = new CanvasDrawEngine();
        this._config = new Config();
        this.imgURL = "https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png";

        // объект изображения с ресурсами, которые будем
        // использовать для создания анимаций
        this.bgImg = new Image();
        this.bgImg.src = this._config.bg.url;
    }

    // рисуем фоновое изображение на канвасе
    draw(bgPartOneResult, bgPartTwoResult) {
        //функция отрисовки первой части фона
        this._drawEngine.draw(
            this.bgImg,
        
            this._config.bg.bgSource.x,
            this._config.bg.bgSource.y,
            this._config.bg.bgSource.width,
            this._config.bg.bgSource.height,
        
            bgPartOneResult.x,
            this._config.bg.bgPartOneResult.y,
            this._config.bg.bgPartOneResult.width,
            this._config.bg.bgPartOneResult.height,
        )

        //функция отрисовки второй части фона
        this._drawEngine.draw(
            this.bgImg,
        
            this._config.bg.bgSource.x,
            this._config.bg.bgSource.y,
            this._config.bg.bgSource.width,
            this._config.bg.bgSource.height,
        
            bgPartTwoResult.x,
            this._config.bg.bgPartTwoResult.y,
            this._config.bg.bgPartTwoResult.width,
            this._config.bg.bgPartTwoResult.height,
        )
    }
}



export default Background;