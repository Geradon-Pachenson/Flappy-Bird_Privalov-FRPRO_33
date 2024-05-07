class Config {
    constructor() {
        
    }

    frameRate = 60; // Желаемая частота кадров (FPS)
    frameDelay = 1000 / this.frameRate; // Задержка между кадрами в миллисекундах

    // // Текущее состояния игры
    // state = {
    //     current: 0,
    //     getReady: 0,
    //     game: 1,
    //     over: 2
    // }

    // переменная, необходимая для расчёта
    // новых координат на каждом кадре
    index = 0;

    //Метод изменения index на определенное значение
    increaseInd() {
        this.index += 1;
    };

    canvas = {
        id: 'canvas',
        width: 450,
        height: 700,
        land: 615,
    };
    
    
    // Ширина и высота птицы. Т.к. птица кажется при анимации маленькой из-за 
    // размаха крыльев, сделал другое соотношение не 20%, а 30%
    _birdSize = {
        w: (this.canvas.land * 0.25) * 0.3, 
        h: (this.canvas.land * 0.25) * 0.3,
    };

    // константы для физики птицы
    gravity = 1;
    SPEED = 1;
    jump = (this.canvas.land * 0.25) / 2; //Прыжок птицы равен половине свободного расстояния между трубами
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
        url: "../images/png/bird.png",
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
        },
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
            height: 500,
        },
        // изображение нижней трубы, которое копируем
        // из изображения-источника
        pipeUp: {
            x: 0,
            y: 0,
            width: 52,
            height: 500,
        },
        //Создаём расстояние между трубами равное 25% высоты трубы
        gap: this.canvas.land * 0.25, 

        padding: 33,
    }

    //Звуковые файлы
    sounds = {
        vzmahSrc:  '../audio//vzmah.mp3',
        scoreSrc: '../audio/score.mp3',
        crashSrc: '../audio/crash.mp3'
    }
}

export default Config;