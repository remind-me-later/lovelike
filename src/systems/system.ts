import { ComponentClass } from "../component_container";
import { Component } from "../components/component";
import { ECS } from "../ecs";
import { Entity } from "../entity";

export abstract class System {
    public abstract ecs: ECS;

    public abstract update(entities: Set<Entity>): void;

    // deno-lint-ignore ban-types
    private _componentsRequired: Set<Function> = new Set();

    // deno-lint-ignore ban-types
    public get componentsRequired(): Set<Function> {
        return this._componentsRequired;
    }

    public addComponentRequired<T extends Component>(
        componentClass: ComponentClass<T>,
    ): void {
        this._componentsRequired.add(componentClass);
    }
}
