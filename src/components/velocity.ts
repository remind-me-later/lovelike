import { MyMath } from "../util/math.ts";
import { Component } from "./component.ts";

export class Velocity extends Component {
    constructor(
        private _dx: number,
        private _dy: number,
        public readonly maxVelocity: number = 15,
    ) {
        super();
    }

    get dx() {
        return this._dx;
    }

    set dx(value: number) {
        this._dx = MyMath.clampAbs(value, this.maxVelocity);
    }

    get dy() {
        return this._dy;
    }

    set dy(value: number) {
        this._dy = MyMath.clampAbs(value, this.maxVelocity);
    }
}
