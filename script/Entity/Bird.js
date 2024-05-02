import Config from "../config.js"
import CanvasDrawEngine from "../Engine/CanvasDrawEngine.js"
import PhysicsEngine from "../Engine/PhysicsEngine.js"

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
        //Пересчитываем координату по оси Y  отображения птицы на canvas
        this._physicsEngine.updateBird(this._physicsEngine.angle);
    }

    // рисуем птичку на канвасе
    draw() {
        this._config.increaseInd(); // Увеличиваем индекс на каждом кадре


        this._drawEngine.save(); 
        this.update();
        //Смещаем координаты начала отрисовки птицы на нужное место
        this._drawEngine.translate(this._config.bird.birdCoords.x, this._physicsEngine.y);
        
        //Наклоняем птицу на нужный угол
        this._drawEngine.rotate(this._physicsEngine.angle);
        
        this._drawEngine.draw(
            this.birdImg,
        
            // Пересчитываем координату по оси X птицы
            // из изображения-источника
            Math.floor((this._config.index % 196) / 14) * 194,
            this._config.bird.frames.y,
            this._config.bird.frames.width,
            this._config.bird.frames.height,
            //из-за угла наклона отрисовку птицы начинаем на -(половину ее размера). Так при наклонах она не смещается по оси у.
            -(this._config.bird.birdCoords.width  / 2),
            -(this._config.bird.birdCoords.height / 2),
            this._config.bird.birdCoords.width,
            this._config.bird.birdCoords.height,
        );

        this._drawEngine.restore();
    };
}


export default Bird;