import Config from "../config.js"
import CanvasDrawEngine from "../Engine/CanvasDrawEngine.js"
import PhysicsEngine from "../Engine/PhysicsEngine.js"

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
        this.pipes = [];
        this.pipes[0] = {
            x : this._config.canvas.width,
            //Первый промежуток посередине игры
            y : -this._config.canvas.height / 3,
        }
    }
    
    

    draw() {
        this._config.increaseInd(); // Увеличиваем индекс на каждом кадре
        for(let i = 0; i < this.pipes.length; i++) {
            //Верхняя труба
            this._drawEngine.draw(
                this.pipeUp,
                
                this._config.pipe.pipeUp.x,
                this._config.pipe.pipeUp.y,
                this._config.pipe.pipeUp.width,
                this._config.pipe.pipeUp.height,

                this.pipes[i].x, 
                this.pipes[i].y,
                this._config.bird.birdCoords.width * 2, //ширина трубы вдвое больше ширины птицы,
                this._config.pipe.pipeUp.height
            );
            //Нижняя труба
            this._drawEngine.draw(
                this.pipeBottom,

                this._config.pipe.pipeBottom.x,
                this._config.pipe.pipeBottom.y,
                this._config.pipe.pipeBottom.width,
                this._config.pipe.pipeBottom.height,
                
                this.pipes[i].x, 
                this.pipes[i].y + this.pipeUp.height + this.gap,
                this._config.bird.birdCoords.width * 2, //ширина трубы вдвое больше ширины птицы,
                this._config.pipe.pipeBottom.height
            );

            this.pipes[i].x--;
            // console.log(this.pipes[i].x);
            //Расстояние между трубами равно ширине трех труб
            if(this.pipes[i].x == this._config.canvas.width - this._config.bird.birdCoords.width * 8) {
                this.pipes.push({
                x : this._config.canvas.width,
                y : -this._physicsEngine.getRandomInt(90, 450),
                });
            }
            
        }
        //Условие очистки массива. Чтобы он не стремился к бесконечности.
        if (this.pipes.length > 3){
            this.pipes.shift()
        }
    }
    
}