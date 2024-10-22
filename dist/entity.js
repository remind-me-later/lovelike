export class Entity {
    x;
    y;
    width;
    height;
    color;
    constructor(x, y, width, height, color) {
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
