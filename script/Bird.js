import Config from "./config.js"
import CanvasDrawEngine from "./CanvasDrawEngine.js"
import PhysicsEngine from "./PhysicsEngine.js"

class Bird {
    constructor() {
        this._drawEngine = new CanvasDrawEngine();
        this._config = new Config();
        this._physicsEngine = new PhysicsEngine();
        
        // объект изображения с ресурсами, которые будем
        // использовать для создания анимаций
        this.birdImg = new Image();
        this.birdImg.src = this._config.bird.url;
    }

    update() {
        this._physicsEngine.fall(this);
    }

    // рисуем птичку на канвасе
    draw(frames, birdCoords) {
        this._drawEngine.draw(
            this.birdImg,
        
            frames.x,
            this._config.bird.frames.y,
            this._config.bird.frames.width,
            this._config.bird.frames.height,
        
            this._config.bird.birdCoords.x,
            birdCoords,
            this._config.bird.birdCoords.width,
            this._config.bird.birdCoords.height
        )
    };
}


export default Bird;