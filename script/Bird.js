//import Entity from "./base.js"

class Bird extends Entity {
    constructor(params) {
        super(params);
        this._flapSpeed = params.flapSpeed;
        //Движок, обработки логики физики
        this._physicsEngine = params.physicsEngine;

        this.falling = true;
    }
    
    //Метод обновления
    update(delta) {
        super.update(delta);

        //Метод обновленя физического движка. Он будет принимать нашу птицу и обновлять его
        this._physicsEngine.update(this, delta);
        //Проверка на касание потолка
        if (this.y < 0) {
            this.y = 0;
        }
        //Проверка на касание нижнего края игры
        if(this.y + this.height >= this._game.height) {
            this._game.gameOver();
        }
    }
    
    //Метод подбрасывания птицы, минус потому что вверх по y 
    flap() {
        this.speed = -this._flapSpeed;
    }
}






//export default Bird;