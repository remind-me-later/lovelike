import { Canvas } from "./canvas";

export class Entity {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
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
