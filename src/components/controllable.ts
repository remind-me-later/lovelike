import { Component } from "./component.ts";

export class Controllable extends Component {
	constructor(
		public readonly xspeed: number = 3,
		public readonly yspeed: number = 12,
	) {
		super();
		this.xspeed = xspeed;
	}
}
