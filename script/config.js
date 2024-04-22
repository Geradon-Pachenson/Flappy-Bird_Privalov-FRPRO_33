
class Config {
    constructor() {
        
    }
    // переменная, необходимая для расчёта
    // новых координат на каждом кадре
    index = 0;

    //Метод изменения index на определенное значение
    increaseInd() {
        this.index += 2.2;
    };

    canvas = {
        id: 'canvas',
        width: 450,
        height: 700,
        land: 615,
    };
    
    
    // ширина и высота птицы
    _birdSize = {
        w: 50, 
        h: 50,
    };

    // константы для физики птицы
    gravity = 2;
    SPEED = 1.2;
    jump = 50;
    delayJump = 400;

    // координата по оси Х фонового изображения
    backgroudX = -((this.index * this.SPEED) % 1900);

    spriteSheet = {
        width: 606,
        height: 428,
        src: '../images/png/sprite.png'
    }

    //Параметры верхней части фонового изображения
    bg = {
        url: "../images/png/bg.png",
        
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

    //Параметры нижней части фонового изображения
    fg = {
        url: "../images/png/fg.png",
        
        // фон который хотим получить
        // из изображения-источника
        bgSource:  {
            x: 0,
            y: 0,
            width: 1900,
            height: 163,
        },

        // фон, который хотим
        // отобразить на Canvas
        bgPartOneResult: {
            x: this.backgroudX + 1900,
            y: 0,
            width: 1900,
            height: 163,
        },

        // вторая часть фонового изображения, которая
        // идёт следом за первой
        bgPartTwoResult: {
            x: this.backgroudX,
            y: 0,
            width: 1900,
            height: 163,
        },
    }

    //Параметры изображения птицы
    bird = {
        url: "../images/png/bird3.png",
        // координаты, по которым птица
        // будет расположена на Canvas
        birdCoords: {
            x: this.canvas.width / 2 - this._birdSize.w,
            y: 300,
            width: this._birdSize.w,
            height: this._birdSize.h,
        },
        
        // изображение птицы, которое копируем
        // из изображения-источника
        frames: {
            x: Math.floor((this.index % 196) / 14) * 194,
            y: 0,
            width: 190,
            height: 200,
        }
        
    }

    //Параметры изображения труб
    pipe = {
        pipeBottomUrl: "../images/png/pipeBottom.png",
        pipeUpUrl: "../images/png/pipeUp.png",
        // изображение нижней трубы, которое копируем
        // из изображения-источника 
        pipeBottom: {
            x: 0,
            y: 0,
            width: 52,
            height: 400,
        },
        // изображение нижней трубы, которое копируем
        // из изображения-источника
        pipeUp: {
            x: 0,
            y: 0,
            width: 52,
            height: 400,
        },
        //Создаём расстояние между трубами
        gap: 90,
    }
}

export default Config;