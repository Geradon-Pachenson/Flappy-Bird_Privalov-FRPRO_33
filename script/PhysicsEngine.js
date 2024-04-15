import Config from "./config.js"
import MouseInputHandler from "./inputHandler.js"

export default class PhysicsEngine {
    constructor() {
        this._config = new Config();

        //Управление птицей мышью. При нажатии на левую кнопку мыши принимаем координаты птицы и запускаем метод bird.flap
        this._inputHandler = new MouseInputHandler({
            left: ({x, y}) => {
                this.flap();
            }
        })
    }
    

    //Метод обновления состояния птицы
    updateBird(y) {
        this._inputHandler.subscribe();
        this.fall(y);
    }

    //Метод подбрасывания птицы, минус потому что вверх по y 
    flap(y) {
        //Если птица достигает верха canvas, она больше не поднимается
        if(y <= 0) {
            y = 0;
        //Иначе подпрыгивает при нажатии на значение config.jump
        } else {
            y -= this._config.jump;
            console.log(y)
        }
    }

    // определяем логику падения птички
    fall(y) {
        y = y + 20;
        // this.y += this.jump;
        // this.checkCollision(); // используем метод "checkCollision" для проверки столкновения
    }
}