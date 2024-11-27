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
}
