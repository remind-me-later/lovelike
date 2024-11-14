import { Gravity } from "../components/gravity";
import { Position } from "../components/position";
import { Velocity } from "../components/velocity";
import { ECS } from "../ecs";
import { Entity } from "../entity";
import { System } from "../system";

export class Physics extends System {
    public componentsRequired: Set<Function> = new Set([
        Position,
        Velocity,
        Gravity,
    ]);

    constructor(public ecs: ECS) {
        super();
    }

    public update(entities: Set<Entity>): void {
        entities.forEach((entity: Entity) => {
            const components = this.ecs.getComponents(entity);
            const position = components.get(Position);
            const velocity = components.get(Velocity);
            const gravity = components.get(Gravity);

            velocity.dy += gravity.acceleration;
            position.x += velocity.dx;
            position.y += velocity.dy;
        });
    }
}
