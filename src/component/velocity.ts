import { MyMath } from "../util/math.ts";
import { Component } from "./mod.ts";

export class Velocity extends Component {
	readonly #maxSpeed: number;

	#dx: number;
	#dy: number;

	constructor(
		dx: number,
		dy: number,
		maxSpeed: number = 15,
	) {
		super();
		this.#maxSpeed = maxSpeed;
		this.#dx = MyMath.clampAbs(dx, this.#maxSpeed);
		this.#dy = MyMath.clampAbs(dy, this.#maxSpeed);
	}

	get dx() {
		return this.#dx;
	}

	set dx(value: number) {
		this.#dx = MyMath.clampAbs(value, this.#maxSpeed);
	}

	get dy() {
		return this.#dy;
	}

	set dy(value: number) {
		this.#dy = MyMath.clampAbs(value, this.#maxSpeed);
	}
}
