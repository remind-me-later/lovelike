import { Component } from "./component.ts";

export class Controllable extends Component {
    constructor(
        public readonly xspeed: number = 5,
        public readonly yspeed: number = 8,
    ) {
        super();
        this.xspeed = xspeed;
    }
}
