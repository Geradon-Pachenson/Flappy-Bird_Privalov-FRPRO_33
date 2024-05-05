import Config from "../config.js"
import CanvasDrawEngine from "../Engine/CanvasDrawEngine.js"

class Background {
    constructor() {
        this._drawEngine = new CanvasDrawEngine();
        this._config = new Config();
        this.imgURL = "https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png";

        // объект изображения верхней части фонового изображения, которое будем
        // использовать для создания анимаций
        this.bgImg = new Image();
        this.bgImg.src = this._config.bg.url;
        // объект изображения нижней части фонового изображения, которое будем
        // использовать для создания анимаций
        this.fgImg = new Image();
        this.fgImg.src = this._config.fg.url;
        this.backgroudX = 0;
    }

    // рисуем фоновое изображение на канвасе
    drawBg() {
        // Пересчитываем координату по оси X фонового изображения. % 1900 - зацикливаем
        this.backgroudX = (this.backgroudX - this._config.SPEED) % 1900;
        //функция отрисовки первой верхней части фона
        this._drawEngine.draw(
            this.bgImg,
        
            this._config.bg.bgSource.x,
            this._config.bg.bgSource.y,
            this._config.bg.bgSource.width,
            this._config.bg.bgSource.height,
        
            this.backgroudX + 1899,
            this._config.bg.bgPartOneResult.y,
            this._config.bg.bgPartOneResult.width,
            this._config.bg.bgPartOneResult.height,
        )

        //функция отрисовки второй верхней части фона
        this._drawEngine.draw(
            this.bgImg,
        
            this._config.bg.bgSource.x,
            this._config.bg.bgSource.y,
            this._config.bg.bgSource.width,
            this._config.bg.bgSource.height,
        
            this.backgroudX,
            this._config.bg.bgPartTwoResult.y,
            this._config.bg.bgPartTwoResult.width,
            this._config.bg.bgPartTwoResult.height,
        )
    }
    // рисуем фоновое изображение на канвасе
    drawFg() {
        this._config.increaseInd(); // Увеличиваем индекс на каждом кадре

         //функция отрисовки первой нижней части фона
        this._drawEngine.draw(
            this.fgImg,
        
            this._config.fg.bgSource.x,
            this._config.fg.bgSource.y,
            this._config.fg.bgSource.width,
            this._config.fg.bgSource.height,
        
            this.backgroudX + 1899,
            this._config.canvas.land,
            this._config.fg.bgPartOneResult.width,
            this._config.fg.bgSource.height,
        )

        //функция отрисовки второй нижней части фона
        this._drawEngine.draw(
            this.fgImg,
        
            this._config.fg.bgSource.x,
            this._config.fg.bgSource.y,
            this._config.fg.bgSource.width,
            this._config.fg.bgSource.height,
        
            this.backgroudX,
            this._config.canvas.land,
            this._config.fg.bgPartTwoResult.width,
            this._config.fg.bgSource.height,
        )
    }
}



export default Background;