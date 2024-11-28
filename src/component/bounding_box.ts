import { Component } from "./mod.ts";

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

	public get leftMostPoint(): number {
		return this.x - this.width / 2;
	}

	public get rightMostPoint(): number {
		return this.x + this.width / 2;
	}

	public get topMostPoint(): number {
		return this.y - this.height / 2;
	}

	public get bottomMostPoint(): number {
		return this.y + this.height / 2;
	}
}
