import Config from "./config.js"
import CanvasDrawEngine from "./CanvasDrawEngine.js"

class Background {
    constructor() {
        this._drawEngine = new CanvasDrawEngine();
        this.config = new Config();
        this.imgURL = "https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png";

        // объект изображения с ресурсами, которые будем
        // использовать для создания анимаций
        this.bgImg = new Image();
        this.bgImg.src = this.config.bg.url;
    }

    // рисуем фоновое изображение на канвасе
    draw(bgPartOneResult, bgPartTwoResult) {
        //функция отрисовки первой части фона
        this._drawEngine.draw(
            this.bgImg,
        
            this.config.bg.bgSource.x,
            this.config.bg.bgSource.y,
            this.config.bg.bgSource.width,
            this.config.bg.bgSource.height,
        
            bgPartOneResult.x,
            this.config.bg.bgPartOneResult.y,
            this.config.bg.bgPartOneResult.width,
            this.config.bg.bgPartOneResult.height,
        )

        //функция отрисовки второй части фона
        this._drawEngine.draw(
            this.bgImg,
        
            this.config.bg.bgSource.x,
            this.config.bg.bgSource.y,
            this.config.bg.bgSource.width,
            this.config.bg.bgSource.height,
        
            bgPartTwoResult.x,
            this.config.bg.bgPartTwoResult.y,
            this.config.bg.bgPartTwoResult.width,
            this.config.bg.bgPartTwoResult.height,
        )
        console.log(this.config.bg.bgSource.x);
    }
}



export default Background;