import { ComponentClass } from "../component_container";
import { Component } from "../components/component";
import { ECS } from "../ecs";
import { Entity } from "../entity";

export abstract class System {
    public abstract ecs: ECS;

    public abstract update(entities: Set<Entity>): void;

    // deno-lint-ignore ban-types
    private componentsRequired: Set<Function> = new Set();

    public addComponentRequired<T extends Component>(
        componentClass: ComponentClass<T>,
    ): void {
        this.componentsRequired.add(componentClass);
    }
}
