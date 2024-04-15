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
    draw(frames, birdY) {
        this._drawEngine.draw(
            this.birdImg,
        
            frames.x,
            this.config.bird.frames.y,
            this.config.bird.frames.width,
            this.config.bird.frames.height,
        
            this.config.bird.birdCoords.x,
            birdY,
            this.config.bird.birdCoords.width,
            this.config.bird.birdCoords.height
        )
    };
}


export default Bird;