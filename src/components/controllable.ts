import { Component } from "./component.ts";

export class Controllable extends Component {
    public readonly speed: number;

    constructor(speed: number) {
        super();
        this.speed = speed;
    }
}
