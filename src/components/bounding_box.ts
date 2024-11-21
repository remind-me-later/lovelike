import { Component } from "./component";

export enum Side {
    Top,
    Right,
    Bottom,
    Left,
}

export class BoundingBox extends Component {
    public collidingSide: Side | undefined;

    constructor(public width: number, public height: number) {
        super();
    }
}
