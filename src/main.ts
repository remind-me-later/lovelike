import { Entity } from "./entity";
import { Canvas } from "./canvas";

class Floor extends Entity {
  constructor(canvas: Canvas) {
    super(0, canvas.height - 100, canvas.width, 100, "green");
  }

  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Ball extends Entity {
  constructor(x: number, y: number) {
    super(x, y, 50, 50, "blue");
  }

  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = "black";
    context.stroke();
  }
}

function main() {
  const canvas = new Canvas(64 * 16, 64 * 9);
  const square = new Ball(100, 100);
  const floor = new Floor(canvas);
  var entities = [square, floor];

  canvas.clear();
  entities.forEach((entity) => entity.draw(canvas.context));
}

main();
