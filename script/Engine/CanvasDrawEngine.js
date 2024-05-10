export default class CanvasDrawEngine {
    constructor() {
        // инициализируем canvas
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
    }
    
    //функция очитски canvas
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    //функция сохранения параметров canvas
    save() {
        this.context.save();
    }

    //функция переноса координат начала отрисовки птицы 
    translate(x, y) {
        this.context.translate(x, y);
    }

    //функция поворота птицы 
    rotate(rotation) {
        this.context.rotate(rotation);
    }

    //функция загрузки текущиx параметров canvas
    restore() {
        this.context.restore();
    }

    //функция отрисовки на canvas
    draw(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        this.context.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    };
    
}