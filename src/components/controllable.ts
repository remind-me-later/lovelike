import { Component } from "./component.ts";

export class Controllable extends Component {
    constructor(public readonly speed: number) {
        super();
        this.speed = speed;
    }
}
