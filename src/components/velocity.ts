import { Component } from "./component.ts";

export class Velocity extends Component {
    constructor(public dx: number, public dy: number) {
        super();
    }
}
