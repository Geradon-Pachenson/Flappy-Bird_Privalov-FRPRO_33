
class Score {
    constructor() {
        this._config = new Config();
        
        this._scoreBox = this._config.scoreBox;
        this._recordBox = this._config.recordBox;
        this._gameOverWindowScore = this._config.gameOverWindowScore;
        
        this._currentScore = 0;
        
        this.getRecord();
        this.update();
    }      
    update() {
        this.setRecord();
        this.create();
    }
    create() {
        this.getRecord();

        this._scoreBox.innerHTML = this._currentScore;
        this._recordBox.innerHTML = this._record;
        this._gameOverWindowScore.innerHTML = this._currentScore;
    }
    increaseScore() {
        this._currentScore += 1;
        this.update()
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
}
        
export default Score;