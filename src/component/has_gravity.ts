import { Component } from "./mod.ts";

export class HasGravity extends Component {
	readonly #acceleration: number;

	constructor(acceleration: number = 1) {
		super();
		this.#acceleration = acceleration;
	}

	public get acceleration() {
		return this.#acceleration;
	}
}
