import { ECS } from "./ecs";
import { Entity } from "./entity";

export abstract class System {
    public abstract componentsRequired: Set<Function>;

    public abstract update(entities: Set<Entity>): void;

    public abstract ecs: ECS;
}
