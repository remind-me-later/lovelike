import { ComponentClass } from "../component/container.ts";
import { Component } from "../component/mod.ts";
import { ECS } from "../ecs.ts";
import { Entity } from "../entity.ts";

export abstract class System {
	protected abstract readonly _componentsRequired: Set<
		ComponentClass<Component>
	>;

	public abstract update(entities: Set<Entity>): void;

	constructor(public readonly ecs: ECS) {}

	public get componentsRequired(): Set<ComponentClass<Component>> {
		return this._componentsRequired;
	}
}
