import { Position } from "../components/position.ts";
import { BoundingBox } from "../components/bounding_box.ts";
import { ECS } from "../ecs.ts";
import { Entity } from "../entity.ts";
import { System } from "./system.ts";
import { Controllable } from "../components/controllable.ts";
import { Velocity } from "../components/velocity.ts";

export class Painter extends System {
	#canvas: HTMLCanvasElement = document.querySelector(
		"canvas",
	) as HTMLCanvasElement;

	#ctx: CanvasRenderingContext2D = this.#canvas.getContext(
		"2d",
	) as CanvasRenderingContext2D;

	public override readonly componentsRequired = new Set([
		Position,
		BoundingBox,
	]);

	constructor(public override readonly ecs: ECS) {
		super(ecs);

		this.#canvas.width = 800;
		this.#canvas.height = 600;
	}

	public width(): number {
		return this.#canvas.width;
	}

	public height(): number {
		return this.#canvas.height;
	}

	public override update(entities: Set<Entity>): void {
		// clear canvas
		// this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.#ctx.fillStyle = "white";
		this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

		entities.forEach((entity: Entity) => {
			const components = this.ecs.getComponents(entity);
			const box = components.get(BoundingBox)!;
			const height = box.height;
			const width = box.width;
			const pos = components.get(Position)!;
			const x = pos.x;
			const y = pos.y;

			this.#ctx.fillStyle = "black";

			// (x, y) coordinates are at the center of the rectangle
			this.#ctx.fillRect(x - width / 2, y - height / 2, width, height);

			// Draw colliding sides of bounding box
			this.#ctx.fillStyle = "magenta";
			const lineWidth = 2;

			if (box.collidingRight) {
				this.#ctx.fillRect(
					x + width / 2 - lineWidth,
					y - height / 2,
					lineWidth,
					height,
				);
			}

			if (box.collidingLeft) {
				this.#ctx.fillRect(
					x - width / 2,
					y - height / 2,
					lineWidth,
					height,
				);
			}

			if (box.collidingTop) {
				this.#ctx.fillRect(
					x - width / 2,
					y - height / 2,
					width,
					lineWidth,
				);
			}

			if (box.collidingBottom) {
				this.#ctx.fillRect(
					x - width / 2,
					y + height / 2 - lineWidth,
					width,
					lineWidth,
				);
			}

			// Draw center of bounding box in green
			this.#ctx.fillStyle = "green";
			this.#ctx.fillRect(x - 2, y - 2, 4, 4);

			// If we are controllable, draw text with info
			if (components.get(Controllable)) {
				const velocity = components.get(Velocity)!;

				this.#ctx.fillStyle = "black";
				// mono-spaced font
				this.#ctx.font = "12px monospace";

				// Write position and velocity of player, rounded to 2 decimal places
				this.#ctx.fillText(
					"Position: " + pos.x.toFixed(2) + ", " + pos.y.toFixed(2),
					this.#canvas.width - 250,
					20,
				);

				this.#ctx.fillText(
					"Velocity: " + velocity.dx.toFixed(2) + ", " +
						velocity.dy.toFixed(2),
					this.#canvas.width - 250,
					40,
				);
			}
		});
	}
}
