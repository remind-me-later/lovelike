import { Position } from "../components/position.ts";
import { BoundingBox } from "../components/bounding_box.ts";
import { ECS } from "../ecs.ts";
import { Entity } from "../entity.ts";
import { System } from "./system.ts";

export class Painter extends System {
    private canvas: HTMLCanvasElement = document.querySelector(
        "canvas",
    ) as HTMLCanvasElement;

    private ctx: CanvasRenderingContext2D = this.canvas.getContext(
        "2d",
    ) as CanvasRenderingContext2D;

    public override readonly componentsRequired = new Set([
        Position,
        BoundingBox,
    ]);

    constructor(public override readonly ecs: ECS) {
        super();

        this.canvas.width = 800;
        this.canvas.height = 600;
    }

    public width(): number {
        return this.canvas.width;
    }

    public height(): number {
        return this.canvas.height;
    }

    public override update(entities: Set<Entity>): void {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        entities.forEach((entity: Entity) => {
            const components = this.ecs.getComponents(entity);
            const height = components.get(BoundingBox)!.height;
            const width = components.get(BoundingBox)!.width;
            const x = components.get(Position)!.x;
            const y = components.get(Position)!.y;

            this.ctx.fillStyle = "black";

            // (x, y) coordinates are at the center of the rectangle
            this.ctx.fillRect(x - width / 2, y - height / 2, width, height);
        });
    }
}
