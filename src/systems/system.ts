import { ComponentClass } from "../component_container.ts";
import { Component } from "../components/component.ts";
import { ECS } from "../ecs.ts";
import { Entity } from "../entity.ts";

export abstract class System {
    public abstract ecs: ECS;

    public abstract update(entities: Set<Entity>): void;

    private _componentsRequired: Set<ComponentClass<Component>> = new Set();

    public get componentsRequired(): Set<
        ComponentClass<Component>
    > {
        return this._componentsRequired;
    }

    public addComponentRequired<T extends Component>(
        componentClass: ComponentClass<T>,
    ): void {
        this._componentsRequired.add(componentClass);
    }
}
