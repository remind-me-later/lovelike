import { Position } from "../component/position.ts";
import { Velocity } from "../component/velocity.ts";
import { ECS } from "../ecs.ts";
import { Entity } from "../entity.ts";
import { System } from "./mod.ts";

export class Movement extends System {
	public override readonly componentsRequired = new Set([Position, Velocity]);

	constructor(public override readonly ecs: ECS) {
		super(ecs);
	}

	public override update(entities: Set<Entity>): void {
		entities.forEach((entity: Entity) => {
			const components = this.ecs.getComponents(entity);
			const position = components.get(Position)!;
			const velocity = components.get(Velocity)!;

			position.x += velocity.dx;
			position.y += velocity.dy;
		});
	}
}
