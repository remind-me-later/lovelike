import { Component } from "./component.ts";

export class Controllable extends Component {
    constructor(
        public readonly xspeed: number = 10,
        public readonly yspeed: number = 15,
    ) {
        super();
        this.xspeed = xspeed;
    }
}
