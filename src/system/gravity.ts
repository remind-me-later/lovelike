import { HasGravity } from "../component/has_gravity.ts";
import { Velocity } from "../component/velocity.ts";
import { ECS } from "../ecs.ts";
import { Entity } from "../entity.ts";
import { System } from "./mod.ts";

export class Gravity extends System {
	public override readonly componentsRequired = new Set([
		Velocity,
		HasGravity,
	]);

	constructor(public override readonly ecs: ECS) {
		super(ecs);
	}

	public override update(entities: Set<Entity>): void {
		entities.forEach((entity: Entity) => {
			const components = this.ecs.getComponents(entity);
			const velocity = components.get(Velocity)!;
			const gravity = components.get(HasGravity)!;

			velocity.dy += gravity.acceleration;
		});
	}
}
