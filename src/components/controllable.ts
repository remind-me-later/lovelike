import { Component } from "./component.ts";

export class Controllable extends Component {
    constructor(public readonly speed: number = 5) {
        super();
        this.speed = speed;
    }
}
