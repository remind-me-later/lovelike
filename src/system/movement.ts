import { BoundingBox } from "../component/bounding_box.ts";
import { Velocity } from "../component/velocity.ts";
import { ECS } from "../ecs.ts";
import { Entity } from "../entity.ts";
import { System } from "./mod.ts";

export class Movement extends System {
	protected override readonly _componentsRequired = new Set([
		BoundingBox,
		Velocity,
	]);

	constructor(ecs: ECS) {
		super(ecs);
	}

	public override update(entities: Set<Entity>): void {
		entities.forEach((entity: Entity) => {
			const components = this.ecs.getComponents(entity);
			const box = components.get(BoundingBox)!;
			const velocity = components.get(Velocity)!;

			box.x += velocity.dx;
			box.y += velocity.dy;
		});
	}
}
