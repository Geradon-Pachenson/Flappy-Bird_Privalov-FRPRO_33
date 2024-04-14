import Config from "./config.js"
import CanvasDrawEngine from "./CanvasDrawEngine.js"
import PhysicsEngine from "./PhysicsEngine.js"

class Bird {
    constructor() {
        this._drawEngine = new CanvasDrawEngine();
        this.config = new Config();
        this._physicsEngine = new PhysicsEngine();
        // объект изображения с ресурсами, которые будем
        // использовать для создания анимаций
        this.birdImg = new Image();
        this.birdImg.src = this.config.bird.url;
    }

    // рисуем птичку на канвасе
    draw(frames) {
        this._drawEngine.draw(
            this.birdImg,
        
            frames.x,
            this.config.bird.frames.y,
            this.config.bird.frames.width,
            this.config.bird.frames.height,
        
            this.config.bird.x,
            this.config.bird.y,
            this.config.bird.width,
            this.config.bird.height
        )
    };

    //Метод обновления
    update(delta) {
        super.update(delta);

        //Метод обновленя физического движка. Он будет принимать нашу птицу и обновлять его
        this._physicsEngine.update(this, delta);
        //Проверка на касание потолка
        if (this.config.bird.y < 0) {
            this.config.bird.y = 0;
        }
        //Проверка на касание нижнего края игры
        if(this.config.bird.y + this.config.bird.height >= this._game.height) {
            console.log('Задела землю')
            // this._game.gameOver();
        }
    }
    
    //Метод подбрасывания птицы, минус потому что вверх по y 
    flap() {
        this.speed = -this._flapSpeed;
    }
}


export default Bird;