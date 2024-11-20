import { Position } from "../components/position";
import { BoundingBox } from "../components/bounding_box";
import { ECS } from "../ecs";
import { Entity } from "../entity";
import { System } from "./system";

export class Painter extends System {
    private canvas: HTMLCanvasElement = document.querySelector(
        "canvas",
    ) as HTMLCanvasElement;

    private ctx: CanvasRenderingContext2D = this.canvas.getContext(
        "2d",
    ) as CanvasRenderingContext2D;

    constructor(public ecs: ECS) {
        super();

        this.addComponentRequired(Position);
        this.addComponentRequired(BoundingBox);

        this.canvas.width = 800;
        this.canvas.height = 600;
    }

    public width(): number {
        return this.canvas.width;
    }

    public height(): number {
        return this.canvas.height;
    }

    public update(entities: Set<Entity>): void {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        entities.forEach((entity: Entity) => {
            const components = this.ecs.getComponents(entity);
            const height = components.get(BoundingBox)!.height;
            const width = components.get(BoundingBox)!.width;
            const x = components.get(Position)!.x;
            const y = components.get(Position)!.y;

            this.ctx.fillStyle = "black";
            this.ctx.fillRect(x, y, width, height);
        });
    }
}
