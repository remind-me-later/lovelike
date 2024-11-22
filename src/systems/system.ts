import { ComponentClass } from "../component_container.ts";
import { Component } from "../components/component.ts";
import { ECS } from "../ecs.ts";
import { Entity } from "../entity.ts";

export abstract class System {
	public abstract readonly componentsRequired: Set<ComponentClass<Component>>;

	public abstract update(entities: Set<Entity>): void;

	constructor(public readonly ecs: ECS) {}
}
