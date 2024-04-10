
class CanvasDrawEngine {
    constructor({ canvas }) {
        super();
        this._canvas = canvas;
    }

    drawdrawImage({spriteSheet, image, x, y, width, height}) {
        super.drawImage({spriteSheet, image, x, y, width, height});
        this._canvas.drawImage(spriteSheet, image.x, image.y, image.w, image.h, x, y, width, height)
    };

    clear() {
        super.clear();
        //Очищаем canvas с начала координат на всю высоту и ширину
        this._canvas.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
}
