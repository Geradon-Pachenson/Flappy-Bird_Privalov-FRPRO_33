
class InputHandler {
    eventHandlerMap = {};

    constructor(eventHandlerConfig) {
        this._eventHandlerConfig = eventHandlerConfig;
    }
    subscribe() {
        Object.entries(this.eventHandlerMap).forEach(([name, handler]) => {
            document.addEventListener(name, handler)
        })
    };
}

//классс управления мышью наследует класс InputHandler и переопределяет subscribe
export default class ControlInputHandler extends InputHandler {
    buttonIndexNameMap = {
        0: 'left',
        1: 'middle',
        2: 'right',
        32: 'Space',
    }

    eventHandlerMap = {
        //Управление по клику левой кнопкой мыши
        click: (event) => {
            const buttonName = this.buttonIndexNameMap[event.button];
            const handler = this._eventHandlerConfig[buttonName];
            if(handler) {
                handler(event);
            }
        },
        //Управление по нажатию кнопкой space
        keydown: (event) => {
            const buttonName = this.buttonIndexNameMap[event.keyCode];
            const handler = this._eventHandlerConfig[buttonName];
            if(handler) {
                handler(event);
            }
        },
    }
}