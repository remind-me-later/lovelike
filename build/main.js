"use strict";
class Canvas {
    canvas = document.querySelector("canvas");
    ctx = this.canvas.getContext("2d");
    constructor(width = 64 * 16, height = 64 * 9) {
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
class Character {
    x;
    y;
    width;
    height;
    color;
    constructor(x = 100, y = 100, width = 100, height = 100, color = "red") {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw(canvas) {
        canvas.context.fillStyle = this.color;
        canvas.context.fillRect(this.x, this.y, this.width, this.height);
    }
}
function main() {
    const canvas = new Canvas();
    const character = new Character();
    // function loop() {
    //   canvas.clear();
    //   character.draw(canvas);
    //   requestAnimationFrame(loop);
    // }
    canvas.clear();
    character.draw(canvas);
}
main();
