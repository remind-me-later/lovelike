import { Position } from "../components/position";
import { Size } from "../components/size";
import { ECS } from "../ecs";
import { Entity } from "../entity";
import { System } from "../system";

export class Painter extends System {
    public componentsRequired: Set<Function> = new Set([Size, Position]);

    private canvas: HTMLCanvasElement = document.querySelector(
        "canvas",
    ) as HTMLCanvasElement;

    private ctx: CanvasRenderingContext2D = this.canvas.getContext(
        "2d",
    ) as CanvasRenderingContext2D;

    constructor(public ecs: ECS) {
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

    public update(entities: Set<Entity>): void {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        entities.forEach((entity: Entity) => {
            const components = this.ecs.getComponents(entity);
            const height = components.get(Size).height;
            const width = components.get(Size).width;
            const x = components.get(Position).x;
            const y = components.get(Position).y;

            this.ctx.fillStyle = "magenta";
            this.ctx.fillRect(x, y, width, height);
        });
    }
}
