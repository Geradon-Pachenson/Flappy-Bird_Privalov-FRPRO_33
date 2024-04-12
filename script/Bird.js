import Config from "./config.js"
import CanvasDrawEngine from "./CanvasDrawEngine.js"

class Bird {
    constructor() {
        this._drawEngine = new CanvasDrawEngine();
        this.config = new Config();
        this.config = new Config();
        
        // объект изображения с ресурсами, которые будем
        // использовать для создания анимаций
        this.birdImg = new Image();
        this.birdImg.src = this.config.bird.url;
    }

    // рисуем птичку на канвасе
    draw() {
        this._drawEngine.draw(
            this.birdImg,
        
            this.config.bird.frames.x,
            this.config.bird.frames.y,
            this.config.bird.frames.width,
            this.config.bird.frames.height,
            this.config.bird.frames.x,
            this.config.bird.frames.y,
            this.config.bird.frames.width,
            this.config.bird.frames.height,
        
            this.config.bird.x,
            this.config.bird.y,
            this.config.bird.width,
            this.config.bird.height
        )
        console.log(this.config.bird.frames.x);
    };






    // //Метод обновления
    // update(delta) {
    //     super.update(delta);

    //     //Метод обновленя физического движка. Он будет принимать нашу птицу и обновлять его
    //     this._physicsEngine.update(this, delta);
    //     //Проверка на касание потолка
    //     if (this.y < 0) {
    //         this.y = 0;
    //     }
    //     //Проверка на касание нижнего края игры
    //     if(this.y + this.height >= this._game.height) {
    //         this._game.gameOver();
    //     }
    // }
    
    // //Метод подбрасывания птицы, минус потому что вверх по y 
    // flap() {
    //     this.speed = -this._flapSpeed;
    // }
}


export default Bird;