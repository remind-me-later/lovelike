import { Component } from "./component.ts";

export class HasGravity extends Component {
    constructor(readonly acceleration: number = 2) {
        super();
    }
}
