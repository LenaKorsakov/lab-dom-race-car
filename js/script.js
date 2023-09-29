import Game from './game.js';

const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const mainScreen = document.querySelector('#game-intro');
const gameScreen = document.querySelector('#game-screen');
const endScreen = document.querySelector('#game-end');

let game;

startButton.addEventListener('click', function () {
  startGame();
});

restartButton.addEventListener('click', function () {
  restartGame();
});

function startGame() {
  console.log('start game');
  mainScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');

  game = new Game();
  game.start();
}

function restartGame() {
  console.log('restart game');
  endScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');

  game = new Game();
  game.restart();
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      game.pressedKeys.up = true;
      game.player.direction.y = -1;
      break;
    case 'ArrowDown':
      game.pressedKeys.down = true;
      game.player.direction.y = 1;
      break;
    case 'ArrowLeft':
      game.pressedKeys.left = true;
      game.player.direction.x = -1;
      break;
    case 'ArrowRight':
      game.pressedKeys.right = true;
      game.player.direction.x = 1;
      break;
  }
});

document.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      game.pressedKeys.up = false;
      game.player.direction.y = -1;
      break;
    case 'ArrowDown':
      game.pressedKeys.down = false;
      game.player.direction.y = 1;
      break;
    case 'ArrowLeft':
      game.pressedKeys.left = false;
      game.player.direction.x = -1;
      break;
    case 'ArrowRight':
      game.pressedKeys.right = false;
      game.player.direction.x = 1;
      break;
  }
});
