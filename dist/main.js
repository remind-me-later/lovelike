import { Entity } from "./entity";
import { Canvas } from "./canvas";
function main() {
    const canvas = new Canvas();
    const rsquare = new Entity();
    const floor = new Entity(0, canvas.height - 100, canvas.width, 100, "green");
    canvas.clear();
    floor.draw(canvas);
    rsquare.draw(canvas);
}
main();
