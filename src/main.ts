import { HasGravity } from "./components/has_gravity";
import { Position } from "./components/position";
import { BoundingBox } from "./components/bounding_box";
import { Velocity } from "./components/velocity";
import { ECS } from "./ecs";
import { Painter } from "./systems/painter";
import { Gravity } from "./systems/gravity";
import { CollisionDetection } from "./systems/collisionDetection";

function main() {
    const ecs = new ECS();
    const painter = new Painter(ecs);
    ecs.addSystem(painter);
    ecs.addSystem(new Gravity(ecs));
    ecs.addSystem(new CollisionDetection(ecs));

    const ball = ecs.addEntity();
    ecs.addComponent(ball, new Position(5, 5));
    ecs.addComponent(ball, new BoundingBox(10, 10));
    ecs.addComponent(ball, new Velocity(0, 0));
    ecs.addComponent(ball, new HasGravity(0.5));

    const floor = ecs.addEntity();
    ecs.addComponent(floor, new Position(0, painter.height() - 100));
    ecs.addComponent(floor, new BoundingBox(painter.width(), 100));

    let lastTime = 0;
    function update(time: number) {
        const deltaTime = time - lastTime;
        lastTime = time;

        ecs.update(deltaTime);
        requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

main();
