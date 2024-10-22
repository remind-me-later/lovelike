export class Canvas {
  private canvas: HTMLCanvasElement = document.querySelector(
    "canvas"
  ) as HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D = this.canvas.getContext(
    "2d"
  ) as CanvasRenderingContext2D;

  constructor(width: number, height: number) {
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
