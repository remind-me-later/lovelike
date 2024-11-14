import { Component } from "./component";

export class Velocity extends Component {
    constructor(public dx: number, public dy: number) {
        super();
    }
}
