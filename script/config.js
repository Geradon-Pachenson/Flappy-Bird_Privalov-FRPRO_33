
class Config {
    constructor() {
        // объект изображения с ресурсами, которые будем
        // использовать для создания анимаций
        this.bgImg = new Image();

        this.birdImg = new Image();
        this.bgImg.src = "../images/png/bird3.png";

    }
    canvas = {
        id: 'canvas',
        width: 450,
        height: 700,
    };
    
    
    // ширина и высота птицы
    _birdSize = [{
        w: 70, 
        y: 70,
    }];
    gravity = 300;

    // переменная, необходимая для расчёта
    // новых координат на каждом кадре
    index = 0;

    // константа для регулирования скорости анимации
    SPEED = 1.3;

    spriteSheet = {
        width: 606,
        height: 428,
        src: '../images/png/sprite.png'
    }


    bird = {
        // координаты, по которым птица
        // будет расположена на Canvas
        x: this.canvas.width / 2 - this._birdSize.w,
        y: 300,
        width: this._birdSize[0].w,
        height: this._birdSize[0].y,
        
        //Скорость подлета при взмахе
        flapSpeed: 300,

        // изображение птицы, которое копируем
        // из изображения-источника
        frames: [
            {
            x: Math.floor((this.index % 196) / 14) * 194,
            y: 0,
            width: 190,
            height: 200,
            }
        ]
    }

}

export default Config;