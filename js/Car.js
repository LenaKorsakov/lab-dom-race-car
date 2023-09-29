class Car {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    this.gameScreenBounding = this.gameScreen.getBoundingClientRect();
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.speed = 2;
    this.grassWidth = 25;

    this.direction = {
      x: 0,
      y: 0,
    };
    this.init(imgSrc);
  }

  init(src) {
    this.element = document.createElement('img');
    this.element.src = src;
    this.element.style.position = 'absolute';
    this.gameScreen.append(this.element);
    this.element.style.height = this.height + 'px';
    this.element.style.width = this.width + 'px';
  }

  move(direction) {
    switch (direction) {
      case 'up':
        if (this.top <= 0) return;
        this.top -= this.speed;

        break;
      case 'down':
        const carBottom = this.top + this.height;
        if (carBottom >= this.gameScreenBounding.height) return;
        this.top += this.speed;

        break;
      case 'left':
        if (this.left <= 0) return;
        this.left -= this.speed;

        break;
      case 'right':
        const carRight = this.width + this.left;
        if (carRight > this.gameScreenBounding.width - this.grassWidth) return;
        this.left += this.speed;

        break;
    }

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
  }

  didCollide(obstacle) {
    const carBounding = this.element.getBoundingClientRect();
    const obsBounding = obstacle.element.getBoundingClientRect();

    if (
      carBounding.left < obsBounding.right &&
      carBounding.right > obsBounding.left &&
      carBounding.top < obsBounding.bottom &&
      carBounding.bottom > obsBounding.top
    ) {
      return true;
    } else return false;
  }
}

export default Car;
