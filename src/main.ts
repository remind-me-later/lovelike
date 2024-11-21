import { HasGravity } from "./components/has_gravity.ts";
import { Position } from "./components/position.ts";
import { BoundingBox } from "./components/bounding_box.ts";
import { Velocity } from "./components/velocity.ts";
import { ECS } from "./ecs.ts";
import { Painter } from "./systems/painter.ts";
import { Gravity } from "./systems/gravity.ts";
import { Collisions } from "./systems/collisions.ts";
import { Controller } from "./systems/controller.ts";
import { Controllable } from "./components/controllable.ts";
import { Movement } from "./systems/movement.ts";

function main() {
    const ecs = new ECS();
    const painter = new Painter(ecs);
    ecs.addSystem(painter);

    ecs.addSystem(new Controller(ecs));
    ecs.addSystem(new Gravity(ecs));

    // Order matters here
    ecs.addSystem(new Movement(ecs));
    ecs.addSystem(new Collisions(ecs));

    const ball = ecs.addEntity();
    ecs.addComponent(ball, new Position(100, 10));
    ecs.addComponent(ball, new BoundingBox(10, 10));
    ecs.addComponent(ball, new Velocity(0, 0));
    ecs.addComponent(ball, new HasGravity(0.5));
    ecs.addComponent(ball, new Controllable(4));

    const floor = ecs.addEntity();
    ecs.addComponent(
        floor,
        new Position(painter.width() / 2, painter.height() - 50),
    );
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
