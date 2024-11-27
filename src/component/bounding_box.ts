import { Component } from "./mod.ts";
import { assertEquals } from "https://deno.land/std/assert/assert_equals.ts";

export class BoundingBox extends Component {
	public collidingLeft = false;
	public collidingRight = false;
	public collidingTop = false;
	public collidingBottom = false;

	#width: number;
	#height: number;

	constructor(
		public x: number,
		public y: number,
		width: number,
		height: number,
	) {
		super();

		this.#width = width;
		this.#height = height;
	}

	public get width() {
		return this.#width;
	}

	public get height() {
		return this.#height;
	}

	public intersects(other: BoundingBox) {
		return (
			this.x < other.x + other.width &&
			this.x + this.width > other.x &&
			this.y < other.y + other.height &&
			this.y + this.height > other.y
		);
	}

	public contains(other: BoundingBox) {
		return (
			this.x < other.x &&
			this.x + this.width > other.x + other.width &&
			this.y < other.y &&
			this.y + this.height > other.y + other.height
		);
	}
}

Deno.test("BoundingBox intersects", () => {
	const box1 = new BoundingBox(0, 0, 10, 10);
	const box2 = new BoundingBox(5, 5, 10, 10);
	const box3 = new BoundingBox(15, 15, 10, 10);

	assertEquals(box1.intersects(box2), true);
	assertEquals(box1.intersects(box3), false);
	assertEquals(box2.intersects(box3), false);
});

Deno.test("BoundingBox contains", () => {
	const box1 = new BoundingBox(0, 0, 10, 10);
	const box2 = new BoundingBox(5, 5, 10, 10);
	const box3 = new BoundingBox(15, 15, 10, 10);
	const box4 = new BoundingBox(1, 1, 5, 4);

	assertEquals(box1.contains(box2), false);
	assertEquals(box1.contains(box3), false);
	assertEquals(box2.contains(box3), false);
	assertEquals(box1.contains(box4), true);
});
