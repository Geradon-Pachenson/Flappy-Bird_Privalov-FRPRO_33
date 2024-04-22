import Config from "./config.js"
import MouseInputHandler from "./inputHandler.js"

export default class PhysicsEngine {
    constructor() {
        this._config = new Config();
        this.y = this._config.bird.birdCoords.y;
        this.x = this._config.bird.birdCoords.x;

        //Управление птицей мышью. При нажатии на левую кнопку мыши принимаем координаты птицы и запускаем метод bird.flap
        this._inputHandler = new MouseInputHandler({
            left: ({x, y}) => {
                this.flap();
            }
        })
    }
    

    //Метод обновления состояния птицы
    updateBird() {
        //Если птица достигает верха canvas, она больше не поднимается
        //(так как анимация крыльев в верхнем положении выходит за предеы canvas,
        //не 0 а чуть больше)
        if(this.y < 0) {
            this.y = 0;
        //Иначе подпрыгивает при нажатии на значение config.jump
        } else {
            this._inputHandler.subscribe();
            this.fall();
            this.checkFalls(); 
        }
    }

    //Метод подбрасывания птицы, минус потому что вверх по y 
    flap() {
        this.y -= this._config.jump;
    }

    // определяем логику падения птички
    fall() {
        return this.y += this._config.gravity;
    }

    // определяем логику столкновения птицы с землёй
    checkFalls() {
        if (this.y + this._config._birdSize.h >= this._config.canvas.land) {
            this.y = this._config.canvas.land - this._config._birdSize.h;
        console.log(`Здесь ${this.y + this._config._birdSize.h}`)
            // SOUNDS.DIE.play();
        }
    }
}