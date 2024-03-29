
class Config {
    constructor() {
    }
    // ширина и высота птицы
    _birdSize = [{
        w: 51, 
        y: 36
    }];
    gravity = 300;
    // переменная, необходимая для расчёта
    // новых координат на каждом кадре
    index = 0;


    canvas = {
        id: 'canvas',
        width: 431,
        height: 768,
    }
    
    spriteSheet = {
        width: 606,
        height: 428,
        src: '../images/png/sprite.png'
    }
    bird = {
        // координаты, по которым птица
        // будет расположена на Canvas
        x: this.canvas.width / 2 - this._birdSize.w / 2,
        y: 300,
        width: this._birdSize.w,
        height: this._birdSize.y,
        
        //Скорость подлета при взмахе
        flapSpeed: 300,

        // изображение птицы, которое копируем
        // из изображения-источника
        frames: [
            {
            x: 432,
            y: Math.floor((this.index % 9) / 3) * this._birdSize.y,
            width: this._birdSize.x,
            height: this._birdSize.y,
            }
        ]
    }
}

//export default Config;