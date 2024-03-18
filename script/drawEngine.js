
class DrawEngine {
    drawImage({spriteSheet, image, x, y, widht, height}) {};
    clear() {};
}

class CanvasDrawEngine extends DrawEngine {
    constructor({ canvas }) {
        super();
        this._canvas = canvas;
    }

    drawdrawImage({spriteSheet, image, x, y, widht, height}) {
        super.drawImage({spriteSheet, image, x, y, widht, height});
        this._canvas.drawImage(spriteSheet, image.x, image.y, image.w, image.h, x, y, widht, height)
    };

    clear() {
        super.clear();
        //Очищаем canvas с начала координат на всю высоту и ширину
        this._canvas.clearRect(0, 0, this._canvas.widht, this._canvas.height);
    }
}