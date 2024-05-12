import ControlInputHandler from "./inputHandler.js"

export default class PhysicsEngine {
    constructor(setting) {
        this._config = setting.config;
        this._sounds = setting.sounds;
        this._inputHandler = setting.inputHandler;
        this.y = this._config.bird.birdCoords.y;
        this.x = this._config.bird.birdCoords.x;

        //Переменная наклона птицы в разных состояниях
        this.angle;
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
        //Проигрываем взмах крыльев если режим игра активен
        if (this._config.state.current === this._config.state.play) {
            this._sounds.vzmahMp3.play()
        };
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

    //Обнуляем координаты птицы на canvas
    reset() {
        this.y = this._config.bird.birdCoords.y;
        this.x = this._config.bird.birdCoords.x;
    }
}