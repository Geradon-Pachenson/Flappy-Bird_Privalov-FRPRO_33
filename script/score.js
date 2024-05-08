import CanvasDrawEngine from "./Engine/CanvasDrawEngine.js"
import Pipe from "./Entity/Pipe.js"

class Score {
    constructor() {
        this._drawEngine = new CanvasDrawEngine();
        this._pipe = new Pipe();
        console.log(this._pipe.currentScore);
    }
        // определяем переменные, рекорд проверяем на наличие в хранилище
        highScore = parseInt(localStorage.getItem("highScore")) || 0;
    

    draw(state) {
        if (state.current == state.game) { // рисуем счёт во время игры
            this._drawEngine._context.lineWidth = 2;
            this._drawEngine._context.font = "30px 'Press Start 2P', cursive";
            this._drawEngine._context.strokeStyle = "#e10b25";
            this._drawEngine._context.strokeText(this._pipe.currentScore, 150, 50);
        } else if (state.current == state.over) { // рисуем счет после окончания игры
            this._drawEngine._context.font = "20px 'Press Start 2P', cursive";
           // текущий
            this._drawEngine._context.strokeText(this._pipe.currentScore, 225, 188);
           // лучщий
            this._drawEngine._context.strokeText(this.highScore, 220, 230);
        }
    }

    reset() { // ресетим
        this.currentScore = 0;
    }
}

export default Score;