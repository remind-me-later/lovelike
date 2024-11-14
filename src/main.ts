import { Gravity } from "./components/gravity";
import { Position } from "./components/position";
import { Size } from "./components/size";
import { Velocity } from "./components/velocity";
import { ECS } from "./ecs";
import { Painter } from "./systems/painter";
import { Physics } from "./systems/physics";

function main() {
    let ecs = new ECS();
    let painter = new Painter(ecs);
    ecs.addSystem(painter);
    ecs.addSystem(new Physics(ecs));

    let ball = ecs.addEntity();
    ecs.addComponent(ball, new Position(5, 5));
    ecs.addComponent(ball, new Size(10, 10));
    ecs.addComponent(ball, new Velocity(0, 0));
    ecs.addComponent(ball, new Gravity(0.5));

    let floor = ecs.addEntity();
    ecs.addComponent(floor, new Position(0, painter.height() - 100));
    ecs.addComponent(floor, new Size(painter.width(), 100));

    let lastTime = 0;
    function update(time: number) {
        let deltaTime = time - lastTime;
        lastTime = time;

        ecs.update(deltaTime);
        requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

main();
