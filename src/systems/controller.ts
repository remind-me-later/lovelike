import { BoundingBox } from "../components/bounding_box.ts";
import { Controllable } from "../components/controllable.ts";
import { Velocity } from "../components/velocity.ts";
import { ECS } from "../ecs.ts";
import { Entity } from "../entity.ts";
import { System } from "./system.ts";

enum Direction {
    Up = "ArrowUp",
    Down = "ArrowDown",
    Left = "ArrowLeft",
    Right = "ArrowRight",
}

enum State {
    Pressed,
    Released,
}

export class Controller extends System {
    public override readonly componentsRequired = new Set([
        BoundingBox,
        Velocity,
    ]);

    private upKeyState: State = State.Released;
    private downKeyState: State = State.Released;
    private leftKeyState: State = State.Released;
    private rightKeyState: State = State.Released;

    constructor(public override readonly ecs: ECS) {
        super();

        globalThis.addEventListener(
            "keydown",
            this.keyPressListener.bind(this),
        );

        globalThis.addEventListener(
            "keyup",
            this.keyReleaseListener.bind(this),
        );
    }

    public override update(entities: Set<Entity>): void {
        entities.forEach((entity: Entity) => {
            const components = this.ecs.getComponents(entity);
            const velocity = components.get(Velocity)!;
            const controllable = components.get(Controllable)!;

            if (this.upKeyState === State.Pressed) {
                velocity.dy = -controllable.yspeed;
            } else if (this.downKeyState === State.Pressed) {
                velocity.dy = controllable.yspeed;
            } else if (this.leftKeyState === State.Pressed) {
                velocity.dx = -controllable.xspeed;
            } else if (this.rightKeyState === State.Pressed) {
                velocity.dx = controllable.xspeed;
            }
        });
    }

    private keyPressListener(event: KeyboardEvent): void {
        switch (event.key) {
            case Direction.Up:
                this.upKeyState = State.Pressed;
                break;
            case Direction.Down:
                this.downKeyState = State.Pressed;
                break;
            case Direction.Left:
                this.leftKeyState = State.Pressed;
                break;
            case Direction.Right:
                this.rightKeyState = State.Pressed;
                break;
        }
    }

    private keyReleaseListener(event: KeyboardEvent): void {
        switch (event.key) {
            case Direction.Up:
                this.upKeyState = State.Released;
                break;
            case Direction.Down:
                this.downKeyState = State.Released;
                break;
            case Direction.Left:
                this.leftKeyState = State.Released;
                break;
            case Direction.Right:
                this.rightKeyState = State.Released;
                break;
        }
    }
}
