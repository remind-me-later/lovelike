import { BoundingBox } from "../component/bounding_box.ts";
import { Velocity } from "../component/velocity.ts";
import { ECS } from "../ecs.ts";
import { Entity } from "../entity.ts";
import { System } from "./mod.ts";

const FRICTION: number = 0.5;

export class Collisions extends System {
	protected override readonly _componentsRequired = new Set([BoundingBox]);
	static readonly #cellSize = 32;

	constructor(ecs: ECS) {
		super(ecs);
	}

	public override update(entities: Set<Entity>): void {
		// Check for collisions
		// for (const entity of entities) {
		// 	this.#checkNearbyCollisions(entity, entities);
		// }

		// Spatial hashing
		const hash: Map<number, Set<Entity>> = new Map();

		for (const entity of entities) {
			const components = this.ecs.getComponents(entity);
			const box = components.get(BoundingBox)!;

			const leftMostCell = Math.floor(
				box.leftMostPoint / Collisions.#cellSize,
			);
			const rightMostCell = Math.floor(
				box.rightMostPoint / Collisions.#cellSize,
			);
			const topMostCell = Math.floor(
				box.topMostPoint / Collisions.#cellSize,
			);
			const bottomMostCell = Math.floor(
				box.bottomMostPoint / Collisions.#cellSize,
			);

			for (let i = leftMostCell; i <= rightMostCell; i++) {
				for (let j = topMostCell; j <= bottomMostCell; j++) {
					const key = i + j * 1000;

					if (!hash.has(key)) {
						hash.set(key, new Set());
					}

					hash.get(key)!.add(entity);
				}
			}
		}

		for (const entity of entities) {
			const components = this.ecs.getComponents(entity);
			const box = components.get(BoundingBox)!;

			const leftMostCell = Math.floor(
				box.leftMostPoint / Collisions.#cellSize,
			);
			const rightMostCell = Math.floor(
				box.rightMostPoint / Collisions.#cellSize,
			);
			const topMostCell = Math.floor(
				box.topMostPoint / Collisions.#cellSize,
			);
			const bottomMostCell = Math.floor(
				box.bottomMostPoint / Collisions.#cellSize,
			);

			const nearbyEntities = new Set<Entity>();

			for (let i = leftMostCell; i <= rightMostCell; i++) {
				for (let j = topMostCell; j <= bottomMostCell; j++) {
					const key = i + j * 1000;

					if (hash.has(key)) {
						for (const otherEntity of hash.get(key)!) {
							if (entity === otherEntity) {
								continue;
							}

							nearbyEntities.add(otherEntity);
						}
					}
				}
			}

			this.#checkNearbyCollisions(entity, nearbyEntities);
		}
	}

	#checkNearbyCollisions(entity: Entity, nearby: Iterable<Entity>): void {
		const components = this.ecs.getComponents(entity);
		const velocity = components.get(Velocity);

		if (!velocity) {
			// We are immovable
			return;
		}

		const box = components.get(BoundingBox)!;

		// Clear previous collisions
		box.collidingTop = false;
		box.collidingBottom = false;
		box.collidingLeft = false;
		box.collidingRight = false;

		for (const otherEntity of nearby) {
			const otherComponents = this.ecs.getComponents(otherEntity);
			const otherBox = otherComponents.get(BoundingBox)!;

			// Check on which side of 'entity' we are colliding against 'otherEntity'
			// remember that (x, y) coordinates are at the center of the rectangle
			const dx = otherBox.x - box.x;
			const dy = otherBox.y - box.y;

			const halfWidth = (box.width + otherBox.width) / 2;
			const halfHeight = (box.height + otherBox.height) / 2;

			if (Math.abs(dx) < halfWidth && Math.abs(dy) < halfHeight) {
				const overlapX = halfWidth - Math.abs(dx);
				const overlapY = halfHeight - Math.abs(dy);

				if (overlapX < overlapY) {
					if (dx > 0) {
						box.x -= overlapX;
						box.collidingRight = true;
					} else {
						box.x += overlapX;
						box.collidingLeft = true;
					}

					velocity.dx = 0;

					// friction
					// velocity.dy *= FRICTION;
				} else {
					if (dy > 0) {
						box.y -= overlapY;
						box.collidingBottom = true;
					} else {
						box.y += overlapY;
						box.collidingTop = true;
					}

					velocity.dy = 0;

					// friction
					velocity.dx *= FRICTION;
				}
			}
		}
	}
}
