import { Component } from "./component.ts";

export class Velocity extends Component {
    constructor(
        public dx: number,
        public dy: number,
        public readonly maxVelocity: number = 10,
    ) {
        super();
    }
}
