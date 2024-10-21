class Canvas {
  private canvas: HTMLCanvasElement = document.querySelector(
    "canvas"
  ) as HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D = this.canvas.getContext(
    "2d"
  ) as CanvasRenderingContext2D;

  constructor(width: number = 64 * 16, height: number = 64 * 9) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  get context() {
    return this.ctx;
  }

  clear() {
    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

class Character {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;

  constructor(
    x: number = 100,
    y: number = 100,
    width: number = 100,
    height: number = 100,
    color: string = "red"
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw(canvas: Canvas) {
    canvas.context.fillStyle = this.color;
    canvas.context.fillRect(this.x, this.y, this.width, this.height);
  }
}

function main() {
  const canvas = new Canvas();
  const character = new Character();

  // function loop() {
  //   canvas.clear();
  //   character.draw(canvas);
  //   requestAnimationFrame(loop);
  // }

  canvas.clear();
  character.draw(canvas);
}

main();
