import { BoundingBox } from "../components/bounding_box";
import { HasGravity } from "../components/has_gravity";
import { Position } from "../components/position";
import { Velocity } from "../components/velocity";
import { ECS } from "../ecs";
import { Entity } from "../entity";
import { System } from "./system";

export class CollisionDetection extends System {
    constructor(public ecs: ECS) {
        super();

        this.addComponentRequired(Position);
        this.addComponentRequired(BoundingBox);
    }

    public update(entities: Set<Entity>): void {
        // Check for collisions
        const entitiesArray = Array.from(entities);

        for (let i = 0; i < entitiesArray.length; i++) {
            const entity = entitiesArray[i];
            const components = this.ecs.getComponents(entity);
            const position = components.get(Position)!;
            const boundingBox = components.get(BoundingBox)!;

            for (let j = i + 1; j < entitiesArray.length; j++) {
                if (i === j) {
                    continue;
                }

                const otherEntity = entitiesArray[j];
                const otherComponents = this.ecs.getComponents(otherEntity);
                const otherPosition = otherComponents.get(Position)!;
                const otherBoundingBox = otherComponents.get(BoundingBox)!;

                if (
                    position.x < otherPosition.x + otherBoundingBox.width &&
                    position.x + boundingBox.width > otherPosition.x &&
                    position.y < otherPosition.y + otherBoundingBox.height &&
                    position.y + boundingBox.height > otherPosition.y
                ) {
                    const velocity = components.get(Velocity);
                    const gravity = components.get(HasGravity);

                    if (velocity) {
                        velocity.dx = 0;
                        velocity.dy = 0;
                    }

                    if (gravity) {
                        position.y = otherPosition.y - boundingBox.height;
                    }
                }
            }
        }
    }
}
