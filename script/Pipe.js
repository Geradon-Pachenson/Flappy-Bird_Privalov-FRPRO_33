import Config from "./config.js"
import CanvasDrawEngine from "./CanvasDrawEngine.js"
import PhysicsEngine from "./PhysicsEngine.js"

export default class Pipe {
    constructor() {
        this._drawEngine = new CanvasDrawEngine();
        this._config = new Config();
        this._physicsEngine = new PhysicsEngine();
        
        // объекты изображения с ресурсами, которые будем
        // использовать для создания анимаций
        this.pipeUp = new Image();
        this.pipeUp.src = this._config.pipe.pipeUpUrl;
        this.pipeBottom = new Image();
        this.pipeBottom.src = this._config.pipe.pipeBottomUrl;
        
        //Создаём расстояние между трубами и сам массив труб
        this.gap = this._config.pipe.gap;
        this.pipe = [];
        this.pipe[0] = {
            x : this._config.canvas.width,
            y : 0
        }
    }
    
    

    draw() {
        for(let i = 0; i < this.pipe.length; i++) {
            //Нижняя труба
            this._drawEngine.draw(
                this.pipeBottom,

                this._config.pipe.pipeBottom.x,
                this._config.pipe.pipeBottom.y,
                this._config.pipe.pipeBottom.width,
                this._config.pipe.pipeBottom.height,
                
                this.pipe[i].x, 
                this.pipe[i].y + this.pipeUp.height + this.gap,
                this._config.pipe.pipeBottom.width * 1.3,
                this._config.pipe.pipeBottom.height
            );

            //Верхняя труба
            this._drawEngine.draw(
                this.pipeUp,
                
                this._config.pipe.pipeUp.x,
                this._config.pipe.pipeUp.y,
                this._config.pipe.pipeUp.width,
                this._config.pipe.pipeUp.height,

                this.pipe[i].x, 
                this.pipe[i].y,
                this._config.pipe.pipeUp.width * 1.3,
                this._config.pipe.pipeUp.height
            );

            this.pipe[i].x--;
        
            if(this.pipe[i].x == 125) {
                this.pipe.push({
                x : this._config.canvas.width,
                y : Math.floor(Math.random() * this.pipeUp.height) - this.pipeUp.height
                });
            }
        }
        //Условие очистки массива. Чтобы он не стремился к бесконечности.
        if (this.pipe.length > 3){
            this.pipe.shift()
        }
    }
    
}