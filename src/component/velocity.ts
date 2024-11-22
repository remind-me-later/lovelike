import { MyMath } from "../util/math.ts";
import { Component } from "./mod.ts";

export class Velocity extends Component {
	#dx: number;
	#dy: number;

	constructor(
		dx: number,
		dy: number,
		public readonly maxVelocity: number = 15,
	) {
		super();
		this.#dx = MyMath.clampAbs(dx, this.maxVelocity);
		this.#dy = MyMath.clampAbs(dy, this.maxVelocity);
	}

	get dx() {
		return this.#dx;
	}

	set dx(value: number) {
		this.#dx = MyMath.clampAbs(value, this.maxVelocity);
	}

	get dy() {
		return this.#dy;
	}

	set dy(value: number) {
		this.#dy = MyMath.clampAbs(value, this.maxVelocity);
	}
}
