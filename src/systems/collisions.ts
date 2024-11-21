import { BoundingBox, Side } from "../components/bounding_box.ts";
import { Position } from "../components/position.ts";
import { Velocity } from "../components/velocity.ts";
import { ECS } from "../ecs.ts";
import { Entity } from "../entity.ts";
import { System } from "./system.ts";

export class Collisions extends System {
    public override readonly componentsRequired = new Set([
        Position,
        BoundingBox,
    ]);

    constructor(public override readonly ecs: ECS) {
        super();
    }

    public override update(entities: Set<Entity>): void {
        // Check for collisions
        const entitiesArray = Array.from(entities);

        for (let i = 0; i < entitiesArray.length; i++) {
            const entity = entitiesArray[i];
            const components = this.ecs.getComponents(entity);
            const position = components.get(Position)!;
            const box = components.get(BoundingBox)!;
            const velocity = components.get(Velocity);

            if (!velocity) {
                // We are immovable
                continue;
            }

            for (let j = 0; j < entitiesArray.length; j++) {
                if (i === j) {
                    continue;
                }

                const otherEntity = entitiesArray[j];
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
                            // Colliding from the left
                            position.x -= overlapX;
                            box.collidingSide = Side.Left;
                        } else {
                            // Colliding from the right
                            position.x += overlapX;
                            box.collidingSide = Side.Right;
                        }

                        velocity.dx = 0;

                        // friction
                        velocity.dy *= 0.97;
                    } else {
                        if (dy > 0) {
                            // Colliding from the top
                            position.y -= overlapY;
                            box.collidingSide = Side.Top;
                        } else {
                            // Colliding from the bottom
                            position.y += overlapY;
                            box.collidingSide = Side.Bottom;
                        }

                        velocity.dy = 0;

                        // friction
                        velocity.dx *= 0.97;
                    }
                }
            }
        }
    }
}
