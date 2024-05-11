
class Score {
    constructor(setting) {
        this._config = setting.config;
        this._drawEngine = setting.drawEngine;

        this.TableImg = new Image();
        this.TableImg.src = this._config.sprite.url;
        
        this._currentScore = 0;
        
        this.getRecord();
        this.update();
    }      
    //Обновляем и перезаписываем рекорд
    update() {
        this.setRecord();
        this.create();
    } 

    create() {
        this.getRecord();
    }

    //Функция увеличения очков
    increaseScore() {
        this._currentScore += 1;
        this.update();
    }

    setRecord() {
        if (this._currentScore > this._record) {
            localStorage.setItem("record", this._currentScore);
        } else {
            localStorage.setItem("record", this._record);
        }
    }

    getRecord() {
        this._record = localStorage.getItem("record");
        if (this._record == 'null' || this._record == 'undefined') {
            this._record = 0;
        }
        return this._record;
    }   

    resetRecord() {
        localStorage.removeItem("record");
    }
    get currentScore() {
        return this._currentScore;
    }
    get record() {
        return this._record;
    }

    //Функция отрисовки очков
    draw() {
        if (this._config.state.current == this._config.state.game) { // рисуем счёт во время игры
            this._drawEngine.context.lineWidth = 2;
            this._drawEngine.context.font = "30px 'YesevaOne-Regular', cursive";
            this._drawEngine.context.strokeStyle = "#9e9a41";
            this._drawEngine.context.strokeText(`Score: ${this.currentScore}`, 310, 680);
        } else if (this._config.state.current == this._config.state.over) { // рисуем счет после окончания игры
            this._drawEngine.context.font = "30px 'YesevaOne-Regular', cursive";
            // текущий
            this._drawEngine.context.strokeText(this.currentScore, 315, 300);
        // лучщий
            this._drawEngine.context.strokeText(this._record, 310, 355);
        }
    }

    // рисуем медаль в зависимости от результата
    drawMedal() {
        if (this._currentScore >= 1 && this._currentScore < 10) { // Бронзовая медаль
            this._drawEngine.draw(this.TableImg, 359, 46, 45, 45, 109, 290, 55, 55);
        } else if (this._currentScore >= 10 && this._currentScore < 20) { // Серебрянная медаль
            this._drawEngine.draw( this.TableImg, 359, 0, 45, 45, 109, 290, 55, 55 );
        } else if (this._currentScore >= 20) { // Золотая медаль
            this._drawEngine.draw( this.TableImg, 311, 46, 45, 45, 109, 290, 55, 55 );
        }
    }
}
        
export default Score;