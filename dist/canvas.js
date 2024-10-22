export class Canvas {
    canvas = document.querySelector("canvas");
    ctx = this.canvas.getContext("2d");
    constructor(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }
    get width() {
        return this.canvas.width;
    }
    get height() {
        return this.canvas.height;
    }
    get context() {
        return this.ctx;
    }
    clear() {
        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
