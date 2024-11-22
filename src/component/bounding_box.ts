import { Component } from "./mod.ts";

export class BoundingBox extends Component {
	public collidingLeft = false;
	public collidingRight = false;
	public collidingTop = false;
	public collidingBottom = false;

	constructor(public width: number, public height: number) {
		super();
	}
}
