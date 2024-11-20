import { HasGravity } from "../components/has_gravity";
import { Velocity } from "../components/velocity";
import { ECS } from "../ecs";
import { Entity } from "../entity";
import { System } from "./system";

export class Gravity extends System {
    constructor(public ecs: ECS) {
        super();
        this.addComponentRequired(Velocity);
        this.addComponentRequired(HasGravity);
    }

    public update(entities: Set<Entity>): void {
        entities.forEach((entity: Entity) => {
            const components = this.ecs.getComponents(entity);
            const velocity = components.get(Velocity)!;
            const gravity = components.get(HasGravity)!;

            velocity.dy += gravity.acceleration;
        });
    }
}
