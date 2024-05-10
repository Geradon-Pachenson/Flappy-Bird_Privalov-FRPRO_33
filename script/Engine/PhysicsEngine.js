import ControlInputHandler from "./inputHandler.js"

export default class PhysicsEngine {
    constructor(params) {
        this._config = params.config;
        this._sounds =  params.sounds;
        this.y = this._config.bird.birdCoords.y;
        this.x = this._config.bird.birdCoords.x;

        //Переменная наклона птицы в разных состояниях
        this.angle;

        //Управление птицей мышью. При нажатии на левую кнопку мыши принимаем координаты птицы и запускаем метод bird.flap
        // При нажатии на кнопку клавиатуры просто запускаем метод bird.flap
        this._inputHandler = new ControlInputHandler({
            left: ({x, y}) => {
                this.flap();
            },
            Space: () => {
                this.flap();
            },
        })
    }
    

    //Метод обновления состояния птицы
    updateBird() {
        this.fall();

        //Подпрыгивает при нажатии на значение config.jump
        this._inputHandler.subscribe();
        //Логика наклона птицы при прыжке и падении
        if (this.flapEndTime > this.fallStartTime) {
            this.angle = -30 * Math.PI/180;
        } else {
            this.angle = 50 * Math.PI/180;
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
        //Проигрываем взмах крыльев
        this._sounds.vzmahMp3.play();
    }

    // определяем логику падения птички
    fall() {
        ////Определяем момент старта падения
        this.fallStartTime = Date.now();
        //опускаем на значение гравитации
        this.y += this._config.gravity;
    }

    //Получение случайного целого числа в заданном интервале для координаты Y труб
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
}