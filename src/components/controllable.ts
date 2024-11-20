import { Component } from "./component";

export class Controllable extends Component {
    public readonly speed: number;

    constructor(speed: number) {
        super();
        this.speed = speed;
    }
}
