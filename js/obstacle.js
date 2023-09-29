class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.width = 100;
    const maxLeft = parseInt(this.gameScreen.style.width) - this.width;
    this.left = Math.floor(Math.random() * maxLeft);
    this.top = -150;
    this.height = 150;
    this.src = './../images/redCar.png';

    this.init(this.src);
  }

  init(src) {
    this.element = new Image(this.width, this.height);
    this.element.src = src;
    this.element.style.position = 'absolute';
    this.gameScreen.append(this.element);
    this.element.style.height = this.height + 'px';
    this.element.style.width = this.width + 'px';
  }

  move() {
    this.top += 2;
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
}

export default Obstacle;
