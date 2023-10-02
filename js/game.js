import Car from './Car.js';
import Obstacle from './obstacle.js';

class Game {
  constructor() {
    this.gameScreen = document.querySelector('#game-screen');
    this.gameEndScreen = document.querySelector('#game-end');
    this.livesElement = document.querySelector('#lives');
    this.scoreElement = document.querySelector('#score');

    this.height = 600;
    this.width = 500;

    this.playerHeight = 150;
    this.playerWidth = 100;

    this.gameScreen.style.width = this.width + 'px';
    this.gameScreen.style.height = this.height + 'px';

    this.player = new Car(
      this.gameScreen,
      this.width / 2 - this.playerWidth / 2,
      this.height - this.playerHeight,
      this.playerWidth,
      this.playerHeight,
      '../images/car.png'
    );

    this.obstacles = [];
    this.animationId = null;
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;

    this.pressedKeys = {
      up: false,
      down: false,
      right: false,
      left: false,
    };
    this.start();

    this.counter = 0;
    this.timeStamp = Date.now();
    this.canBeHit = true;
  }

  start() {
    this.gameLoop();
  }

  gameLoop() {
    if (this.gameIsOver) {
      return;
    }
    this.update();
    this.animationId = requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    //  GAME ENGINE

    if (this.counter % 300 === 0) {
      this.obstacles.push(new Obstacle(this.gameScreen));
      this.counter = 0;
    }
    this.counter++;

    for (const obstacle of this.obstacles) {
      obstacle.move();
      obstacle.updatePosition();

      if (this.player.didCollide(obstacle)) {
        console.log('Collision!');
        obstacle.element.remove();
        this.lives--;
        this.livesElement.textContent = this.lives;
      }
      if (obstacle.top > this.height) {
        this.score++;
        this.scoreElement.textContent = this.score;
      }
    }

    const obstaclesToRemove = this.obstacles.filter((obstacle) => {
      return obstacle.top > this.height;
    });

    obstaclesToRemove.forEach((obstacle) => obstacle.element.remove());

    this.obstacles = this.obstacles.filter((obstacle) => {
      return obstacle.top <= this.height;
    });

    if (this.lives === 0) {
      this.gameIsOver = true;
      cancelAnimationFrame(this.animationId);
      const animation = this.gameScreen.getAnimations();
      animation[0].pause();

      this.gameEndScreen.classList.remove('hidden');
      this.gameScreen.classList.add('hidden');
    }

    for (const key in this.pressedKeys) {
      if (this.pressedKeys[key]) {
        this.player.move(key);
      }
    }

    this.player.updatePosition();
  }

  restart() {
    this.obstacles = [];
    console.log('obstacles', this.obstacles);
    this.animationId = null;
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;

    this.scoreElement.textContent = this.score;
    this.livesElement.textContent = this.lives;

    const imageElements = this.gameScreen.querySelectorAll('img');
    for (const image of imageElements) {
      image.remove();
    }

    this.player = new Car(
      this.gameScreen,
      this.width / 2 - this.playerWidth / 2,
      this.height - this.playerHeight,
      this.playerWidth,
      this.playerHeight,
      '../images/car.png'
    );

    this.gameLoop();
  }
}

export default Game;
