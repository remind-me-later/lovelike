import { Component } from "./mod.ts";

export class Controllable extends Component {
	readonly #xspeed: number;
	readonly #yspeed: number;

	constructor(
		xspeed: number = 3,
		yspeed: number = 12,
	) {
		super();
		this.#xspeed = xspeed;
		this.#yspeed = yspeed;
	}

	public get xspeed() {
		return this.#xspeed;
	}

	public get yspeed() {
		return this.#yspeed;
	}
}
