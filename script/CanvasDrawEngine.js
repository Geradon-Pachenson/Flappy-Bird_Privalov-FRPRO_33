export default class CanvasDrawEngine {
    constructor() {
        // инициализируем canvas
        this.canvas = document.getElementById('canvas');
        this._context = this.canvas.getContext('2d');
    }
    
    //функция очитски canvas
    clear() {
        this._context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    //функция сохранения параметров canvas
    save() {
        this._context.save();
    }

    //функция переноса координат начала отрисовки птицы 
    translate(x, y) {
        this._context.translate(x, y);
    }

    //функция поворота птицы 
    rotate(rotation) {
        this._context.rotate(rotation);
    }

    //функция загрузки текущим параметров canvas
    restore() {
        this._context.restore();
    }

    //функция отрисовки на canvas
    draw(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        this._context.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    };
}