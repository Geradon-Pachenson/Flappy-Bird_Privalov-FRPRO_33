
export default class Sounds {
    constructor() {
        this._config = new Config();

        this.vzmahMp3 = new Audio;
        this.vzmahMp3.src = this._config.sounds.vzmahSrc;

        this.scoreMp3 = new Audio();
        this.scoreMp3.src = this._config.sounds.scoreSrc;

        this.crashMp3 = new Audio();
        this.crashMp3.src = this._config.sounds.crashSrc;
    }
}