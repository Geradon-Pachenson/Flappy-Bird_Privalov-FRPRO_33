export default class CanvasDrawEngine {
    constructor(context) {
        this.context = context;
    }
    
    //функция очитски canvas
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    //функция отрисовки на canvas
    draw(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        this.context.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    };
}