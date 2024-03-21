
class Config {
    constructor() {
        // ширина и высота птицы
        this._size = [51, 36];
    }
    gravity = 300;


    canvas = {
        id: 'canvas',
        width: 431,
        height: 768,
    }
    
    spriteSheet = {
        widht: 606,
        height: 428,
        src: '../images/png/sprite.png'
    }

    bird = {
        // координаты, по которым птица
        // будет расположена на Canvas
        x: canvas.width / 2 - this._size[0] / 2,
        y: 300,
        width: this._size[0],
        height: this._size[1],
        
        //Скорость подлета при взмахе
        flapSpeed: 300,

        // изображение птицы, которое копируем
        // из изображения-источника
        frames: [
            {
            x: 432,
            y: Math.floor((index % 9) / 3) * size[1],
            width: size[0],
            height: size[1],
            }
        ]
    }
}

//export default Config;