import { Component } from "./component";

// Position components indicates the center of an entity
export class Position extends Component {
    constructor(public x: number, public y: number) {
        super();
    }
}
