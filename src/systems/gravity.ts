import { HasGravity } from "../components/has_gravity.ts";
import { Velocity } from "../components/velocity.ts";
import { ECS } from "../ecs.ts";
import { Entity } from "../entity.ts";
import { System } from "./system.ts";

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
