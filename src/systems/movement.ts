import { Position } from "../components/position";
import { Velocity } from "../components/velocity";
import { ECS } from "../ecs";
import { Entity } from "../entity";
import { System } from "./system";

export class Movement extends System {
    constructor(public ecs: ECS) {
        super();
        this.addComponentRequired(Position);
        this.addComponentRequired(Velocity);
    }

    public update(entities: Set<Entity>): void {
        entities.forEach((entity: Entity) => {
            const components = this.ecs.getComponents(entity);
            const position = components.get(Position)!;
            const velocity = components.get(Velocity)!;

            position.x += velocity.dx;
            position.y += velocity.dy;

            // Friction
            velocity.dx *= 0.99;
            velocity.dy *= 0.99;
        });
    }
}
