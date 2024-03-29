
class Entity {
    constructor({ x, y, width, height, frames, spriteSheet, drawEngine, game }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 0;
        this.falling = false;

        //Спиоск фреймов
        this._frames = frames;
        //Начальный фрейм
        this._frameIndx = 0;
        this._spriteSheet = spriteSheet;
        
        //Движок, отображения птицы
        this._drawEngine = drawEngine;
        //Объект экрана
        this._game = game;
    }
    //Метод отрисовки
    draw() {
        this._drawEngine.drawImage({
            spriteSheet: this._spriteSheet, 
            image: this._frames[this._frameIndx], 
            x: this.x, 
            y: this.y, 
            width: this.width, 
            height: this.height,
        });
    }

    update(delta) {
        //Логика смены фреймов пр каждом такте обновления. Увеличиваем на дельту, чтобы птица махала крыльями с одинаковой скоростью,
        //а не зависила от нагруженности процессора
        this._frameIndx = (this._frameIndx + delta) % this._frames.lenght;
    }
}

//export default Entity;