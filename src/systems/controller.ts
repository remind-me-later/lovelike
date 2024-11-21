import { BoundingBox } from "../components/bounding_box.ts";
import { Controllable } from "../components/controllable.ts";
import { Velocity } from "../components/velocity.ts";
import { ECS } from "../ecs.ts";
import { Entity } from "../entity.ts";
import { RingBuffer } from "../util/ring_buffer.ts";
import { System } from "./system.ts";

enum Direction {
    Up = "ArrowUp",
    Down = "ArrowDown",
    Left = "ArrowLeft",
    Right = "ArrowRight",
}

export class Controller extends System {
    private queue: RingBuffer<Direction> = new RingBuffer<Direction>(10);

    constructor(public ecs: ECS) {
        super();

        this.addComponentRequired(BoundingBox);
        this.addComponentRequired(Velocity);

        globalThis.addEventListener("keydown", this.keyDownListener.bind(this));
    }

    public update(entities: Set<Entity>): void {
        entities.forEach((entity: Entity) => {
            const components = this.ecs.getComponents(entity);
            const velocity = components.get(Velocity)!;
            const controllable = components.get(Controllable)!;

            while (this.queue.size() > 0) {
                const direction = this.queue.pop();

                switch (direction) {
                    case Direction.Up:
                        velocity.dy = -controllable.speed;
                        break;
                    case Direction.Down:
                        velocity.dy = controllable.speed;
                        break;
                    case Direction.Left:
                        velocity.dx = -controllable.speed;
                        break;
                    case Direction.Right:
                        velocity.dx = controllable.speed;
                        break;
                }
            }
        });
    }

    private keyDownListener(event: KeyboardEvent): void {
        switch (event.key) {
            case Direction.Up:
                this.queue.push(Direction.Up);
                break;
            case Direction.Down:
                this.queue.push(Direction.Down);
                break;
            case Direction.Left:
                this.queue.push(Direction.Left);
                break;
            case Direction.Right:
                this.queue.push(Direction.Right);
                break;
        }
    }
}
