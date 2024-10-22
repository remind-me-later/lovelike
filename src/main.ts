import { Entity } from "./entity";
import { Canvas } from "./canvas";

function main() {
  const canvas = new Canvas(64 * 16, 64 * 9);
  const square = new Entity(100, 100, 100, 100, "red");
  const floor = new Entity(0, canvas.height - 100, canvas.width, 100, "green");
  var entities = [square, floor];

  canvas.clear();
  entities.forEach((entity) => entity.draw(canvas));
}

main();
