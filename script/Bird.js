import Config from "./config.js"

class Bird {
    constructor(canvas) {
        this.config = new Config();
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        console.log(this.ctx)
    }
    // рисуем птичку на канвасе
    draw () {
        this.ctx.drawImage(
            this.config.bird.src,
        
            this.config.bird.frames.x,
            this.config.bird.frames.y,
            this.config.bird.frames.width,
            this.config.bird.frames.height,
        
            this.config.bird.x,
            this.config.bird.y,
            this.config.bird.width,
            this.config.bird.height
        );
    };






    //Метод обновления
    update(delta) {
        super.update(delta);

        //Метод обновленя физического движка. Он будет принимать нашу птицу и обновлять его
        this._physicsEngine.update(this, delta);
        //Проверка на касание потолка
        if (this.y < 0) {
            this.y = 0;
        }
        //Проверка на касание нижнего края игры
        if(this.y + this.height >= this._game.height) {
            this._game.gameOver();
        }
    }
    
    //Метод подбрасывания птицы, минус потому что вверх по y 
    flap() {
        this.speed = -this._flapSpeed;
    }
}


export default Bird;