
class Bird {
    constructor({x, y, widht, height, frames, spriteSheet, flapSpeed, physicsEngine, game}) {
        this.x = x;
        this.y = y;
        this.widht = widht;
        this.height = height;
        this.speed = 0;

        //Спиоск фреймов
        this._frames = frames;
        //Начальный фрейм
        this._frameIndx = 0;
        this._spriteSheet = spriteSheet;
        this._flapSpeed = flapSpeed;
        //Движок, обработки логики физики
        this._physicsEngine = physicsEngine;
        //Движок, отображения птицы
        this._drawEngine = drawEngine;
        //Объект экрана
        this._game = game;
    }
    
    draw() {
        this._drawEngine.drawImage(this._spriteSheet, this._frames[this._frameIndx], this.x, this.y, this.widht, this.height);
    }

    //Метод обновления
    update() {
        //Метод обновленя физического движка. Он будет принимать нашу птицу и обновлять его
        this._physicsEngine.update(this);
        //Проверка на касание потолка
        if (this.y < 0) {
            this.y = 0;
        }
        //Проверка на касание нижнего края игры
        if(this.y + this.height >= this._game.height) {
            this._game.gameOver();
        }
        //Логика смены фреймов пр каждом такте обновления
        this._frameIndx = (this._frameIndx + 1) % this._frames.lenght;
    }
    
    //Метод подбрасывания птицы, минус потому что вверх по y 
    flap() {
        this.speed = -this._flapSpeed;
    }
}






export default Bird;