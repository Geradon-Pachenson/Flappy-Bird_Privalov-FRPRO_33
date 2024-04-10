export default class CanvasDrawEngine {
    constructor() {
        // инициализируем canvas
        this._canvas = document.getElementById('canvas');
        this._context = this._canvas.getContext('2d');
    }
    
    //функция очитски canvas
    clear() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
    //функция отрисовки на canvas
    draw(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        this._context.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    };
}