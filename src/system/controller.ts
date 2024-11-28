import { BoundingBox } from "../component/bounding_box.ts";
import { Controllable } from "../component/controllable.ts";
import { Velocity } from "../component/velocity.ts";
import { ECS } from "../ecs.ts";
import { Entity } from "../entity.ts";
import { System } from "./mod.ts";

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
	protected override readonly _componentsRequired = new Set([
		BoundingBox,
		Velocity,
	]);

	#upKeyState: State = State.Released;
	#downKeyState: State = State.Released;
	#leftKeyState: State = State.Released;
	#rightKeyState: State = State.Released;

	constructor(ecs: ECS) {
		super(ecs);

		globalThis.addEventListener(
			"keydown",
			this.#keyPressListener.bind(this),
		);

		globalThis.addEventListener(
			"keyup",
			this.#keyReleaseListener.bind(this),
		);
	}

	public override update(entities: Set<Entity>): void {
		entities.forEach((entity: Entity) => {
			const components = this.ecs.getComponents(entity);
			const velocity = components.get(Velocity)!;
			const controllable = components.get(Controllable)!;
			const box = components.get(BoundingBox)!;

			if (
				this.#upKeyState === State.Pressed &&
				box.collidingBottom === true
			) {
				velocity.dy = -controllable.yspeed;
			}

			if (this.#downKeyState === State.Pressed) {
				velocity.dy = controllable.yspeed;
			}

			if (this.#leftKeyState === State.Pressed) {
				velocity.dx = -controllable.xspeed;
			}

			if (this.#rightKeyState === State.Pressed) {
				velocity.dx = controllable.xspeed;
			}
		});
	}

	#keyPressListener(event: KeyboardEvent): void {
		switch (event.key) {
			case Direction.Up:
				this.#upKeyState = State.Pressed;
				break;
			case Direction.Down:
				this.#downKeyState = State.Pressed;
				break;
			case Direction.Left:
				this.#leftKeyState = State.Pressed;
				break;
			case Direction.Right:
				this.#rightKeyState = State.Pressed;
				break;
		}
	}

	#keyReleaseListener(event: KeyboardEvent): void {
		switch (event.key) {
			case Direction.Up:
				this.#upKeyState = State.Released;
				break;
			case Direction.Down:
				this.#downKeyState = State.Released;
				break;
			case Direction.Left:
				this.#leftKeyState = State.Released;
				break;
			case Direction.Right:
				this.#rightKeyState = State.Released;
				break;
		}
	}
}
