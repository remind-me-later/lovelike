import { BoundingBox } from "../component/bounding_box.ts";
import { Position } from "../component/position.ts";
import { Velocity } from "../component/velocity.ts";
import { ECS } from "../ecs.ts";
import { Entity } from "../entity.ts";
import { System } from "./mod.ts";

const FRICTION: number = 0.5;

export class Collisions extends System {
	public override readonly componentsRequired = new Set([
		Position,
		BoundingBox,
	]);

	constructor(public override readonly ecs: ECS) {
		super(ecs);
	}

	public override update(entities: Set<Entity>): void {
		// Check for collisions
		entities.forEach((entity) => {
			const components = this.ecs.getComponents(entity);
			const velocity = components.get(Velocity);

			if (!velocity) {
				// We are immovable
				return;
			}

			const position = components.get(Position)!;
			const box = components.get(BoundingBox)!;

			// Clear previous collisions
			box.collidingTop = false;
			box.collidingBottom = false;
			box.collidingLeft = false;
			box.collidingRight = false;

			entities.forEach((otherEntity) => {
				if (entity === otherEntity) {
					return;
				}

				const otherComponents = this.ecs.getComponents(otherEntity);
				const otherPosition = otherComponents.get(Position)!;
				const otherBox = otherComponents.get(BoundingBox)!;

				// Check on which side of 'entity' we are colliding against 'otherEntity'
				// remember that (x, y) coordinates are at the center of the rectangle
				const dx = otherPosition.x - position.x;
				const dy = otherPosition.y - position.y;

				const halfWidth = (box.width + otherBox.width) / 2;
				const halfHeight = (box.height + otherBox.height) / 2;

				if (Math.abs(dx) < halfWidth && Math.abs(dy) < halfHeight) {
					const overlapX = halfWidth - Math.abs(dx);
					const overlapY = halfHeight - Math.abs(dy);

					if (overlapX < overlapY) {
						if (dx > 0) {
							position.x -= overlapX;
							box.collidingRight = true;
						} else {
							position.x += overlapX;
							box.collidingLeft = true;
						}

						velocity.dx = 0;

						// friction
						// velocity.dy *= FRICTION;
					} else {
						if (dy > 0) {
							position.y -= overlapY;
							box.collidingBottom = true;
						} else {
							position.y += overlapY;
							box.collidingTop = true;
						}

						velocity.dy = 0;

						// friction
						velocity.dx *= FRICTION;
					}
				}
			});
		});
	}
}
