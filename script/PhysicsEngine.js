import Config from "./config.js"

export default class PhysicsEngine {
    constructor() {
        this.config = new Config();
        this._gravity = this.config.gravity;
    }
    //Метод апгрейда сущности с переданной дельтой
    update(entity, delta) {
        //Проверка на падение сущностей. По дефолту падает только птица
        if(entity.falling) {
            //Пересчитываем скорость с условием гравитации
            entity.speed +=  this._gravity * delta;
            //Увеличиваем y на скорость сущности - падает с ускорением сущности
            entity.y += entity.speed * delta;
        }
    }
}