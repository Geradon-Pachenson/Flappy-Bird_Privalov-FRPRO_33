import Config from "./config.js"
import MouseInputHandler from "./inputHandler.js"

export default class PhysicsEngine {
    constructor() {
        this._config = new Config();
        this.y = this._config.bird.birdCoords.y;
        this.x = this._config.bird.birdCoords.x;
        this.falling = true;

        //Переменная наклона птицы в разных состояниях
        this.angle;

        //Управление птицей мышью. При нажатии на левую кнопку мыши принимаем координаты птицы и запускаем метод bird.flap
        this._inputHandler = new MouseInputHandler({
            left: ({x, y}) => {
                this.flap();
            }
        })
    }
    

    //Метод обновления состояния птицы
    updateBird() {
        this.fall();

        //Подпрыгивает при нажатии на значение config.jump
        this._inputHandler.subscribe();
        this.checkFalls();

        if (this.flapEndTime > this.fallStartTime) {
            this.angle = -20 * Math.PI/180;
        } else {
            this.angle = 20 * Math.PI/180;
        } 

        //Если птица достигает верха canvas, она больше не поднимается
        //(так как анимация крыльев в верхнем положении при наклоне птицы выходит за предеы canvas,
        //не 0 а чуть больше)
        if(this.y < this._config.bird.birdCoords.height / 2) {
            this.y = this._config.bird.birdCoords.height / 2;
        }
    }

    //Метод подбрасывания птицы, минус потому что вверх по y 
    flap() {
        this.y -= this._config.jump;
        
        //Определяем момент старта взлета-прыжка
        this.flapStartTime = Date.now();
        //Определяем момент остановки взлета-прыжка
        this.flapEndTime = Date.now() + this._config.delayJump;
    }

    // определяем логику падения птички
    fall() {
        ////Определяем момент старта падения
        this.fallStartTime = Date.now();
        //опускаем на значение гравитации
        this.y += this._config.gravity;
    }

    // определяем логику столкновения птицы с землёй, с учетом наклона птицы 
    checkFalls() {
        if (this.y + this._config.bird.birdCoords.height >= this._config.canvas.land) {
            this.y = this._config.canvas.land - this._config.bird.birdCoords.height;
            // SOUNDS.DIE.play();
        }
    }
}