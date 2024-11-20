import { Component } from "./component";

export class HasGravity extends Component {
    constructor(readonly acceleration: number) {
        super();
    }
}
