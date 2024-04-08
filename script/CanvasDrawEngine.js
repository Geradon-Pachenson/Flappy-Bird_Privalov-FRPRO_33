export default class CanvasDrawEngine {
    constructor(params) {
        this._config = params.config;
        
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    draw(img, x, y, width, height) {
        this.ctx.drawImage(
            img,
            x,
            y,
            width,
            height
        );
    };
}