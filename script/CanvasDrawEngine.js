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
    //функция отрисовки на canvas
    draw(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        this._context.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    };
}