import { Component } from "./mod.ts";

export class HasGravity extends Component {
	constructor(readonly acceleration: number = 1) {
		super();
	}
}
