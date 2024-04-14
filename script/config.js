
class Config {
    constructor() {
        
    }
    // переменная, необходимая для расчёта
    // новых координат на каждом кадре
    index = 0;

    //Метод изменения index на определенное значение
    increaseInd(index) {
        this.index += 2.2;
    };

    canvas = {
        id: 'canvas',
        width: 450,
        height: 700,
    };
    
    
    // ширина и высота птицы
    _birdSize = {
        w: 70, 
        y: 70,
    };

    // константы для физики птицы
    gravity = 0.25;
    SPEED = 1.3;
    jump = 0;

    // задаём силу прыжка
    flap() {
        this.jump = -this.speed;
    };

    // определяем логику падения птички
    fall() {
        this.jump += this.gravity;
        this.y += this.jump;
        this.checkCollision(); // используем метод "checkCollision" для проверки столкновения
    }

    // координата по оси Х фонового изображения
    backgroudX = -((this.index * this.SPEED) % 1900);

    spriteSheet = {
        width: 606,
        height: 428,
        src: '../images/png/sprite.png'
    }

    //Параметры фонового изображения
    bg = {
        url: "../images/png/background.png",
        
        // фон который хотим получить
        // из изображения-источника
        bgSource:  {
            x: 0,
            y: 300,
            width: 1900,
            height: this.canvas.height,
        },

        // фон, который хотим
        // отобразить на Canvas
        bgPartOneResult: {
            x: this.backgroudX + 1900,
            y: 0,
            width: 1900,
            height: this.canvas.height,
        },

        // вторая часть фонового изображения, которая
        // идёт следом за первой
        bgPartTwoResult: {
            x: this.backgroudX,
            y: 0,
            width: 1900,
            height: this.canvas.height,
        },
    }

    //Параметры изображения птицы
    bird = {
        url: "../images/png/bird3.png",
        // координаты, по которым птица
        // будет расположена на Canvas
        x: this.canvas.width / 2 - this._birdSize.w,
        y: 300,
        width: this._birdSize.w,
        height: this._birdSize.y,
        
        //Скорость подлета при взмахе
        flapSpeed: 300,

        // изображение птицы, которое копируем
        // из изображения-источника
        frames: {
            x: Math.floor((this.index % 196) / 14) * 194,
            y: 0,
            width: 190,
            height: 200,
        }
        
    }

}

export default Config;