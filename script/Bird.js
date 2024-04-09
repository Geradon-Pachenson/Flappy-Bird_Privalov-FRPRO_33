import Config from "./config.js"
import CanvasDrawEngine from "./CanvasDrawEngine.js"

class Bird {
    constructor(context) {
        this._drawEngine = new CanvasDrawEngine(this.context);
        this.context = context;
        this.config = new Config();

        console.log(this._drawEngine.canvas);

    }
    // рисуем птичку на канвасе
    draw() {
        this._drawEngine.draw (
            this.config.bird.src,
        
            this.config.bird.frames[0].x,
            this.config.bird.frames[0].y,
            this.config.bird.frames[0].width,
            this.config.bird.frames[0].height,
        
            this.config.bird.x,
            this.config.bird.y,
            this.config.bird.width,
            this.config.bird.height
        )
        
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