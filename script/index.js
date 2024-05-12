import Game from "./Game.js"

const game = new Game();

const render = () => {
    game.loadAssets()
        .then(() => {
            game.prepare();
        })
};

render();


