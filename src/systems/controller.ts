import { BoundingBox } from "../components/bounding_box";
import { Controllable } from "../components/controllable";
import { Position } from "../components/position";
import { Velocity } from "../components/velocity";
import { ECS } from "../ecs";
import { Entity } from "../entity";
import { Queue } from "../util/queue";
import { System } from "./system";

enum Direction {
    Up = "ArrowUp",
    Down = "ArrowDown",
    Left = "ArrowLeft",
    Right = "ArrowRight",
}

export class Controller extends System {
    private queue: Queue<Direction> = new Queue<Direction>(10);

    constructor(public ecs: ECS) {
        super();

        this.addComponentRequired(Position);
        this.addComponentRequired(BoundingBox);
        this.addComponentRequired(Velocity);

        window.addEventListener("keydown", this.keyDownListener.bind(this));
    }

    public update(entities: Set<Entity>): void {
        entities.forEach((entity: Entity) => {
            const components = this.ecs.getComponents(entity);
            const position = components.get(Position)!;
            const velocity = components.get(Velocity)!;
            const controllable = components.get(Controllable)!;

            if (this.queue.size() > 0) {
                const direction = this.queue.dequeue();

                switch (direction) {
                    case Direction.Up:
                        velocity.dx = 0;
                        velocity.dy = -controllable.speed;
                        break;
                    case Direction.Down:
                        velocity.dx = 0;
                        velocity.dy = controllable.speed;
                        break;
                    case Direction.Left:
                        velocity.dx = -controllable.speed;
                        velocity.dy = 0;
                        break;
                    case Direction.Right:
                        velocity.dx = controllable.speed;
                        velocity.dy = 0;
                        break;
                }
            }

            position.x += velocity.dx;
            position.y += velocity.dy;
        });
    }

    private keyDownListener(event: KeyboardEvent): void {
        switch (event.key) {
            case Direction.Up:
                this.queue.enqueue(Direction.Up);
                break;
            case Direction.Down:
                this.queue.enqueue(Direction.Down);
                break;
            case Direction.Left:
                this.queue.enqueue(Direction.Left);
                break;
            case Direction.Right:
                this.queue.enqueue(Direction.Right);
                break;
        }
    }
}
