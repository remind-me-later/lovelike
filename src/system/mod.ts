import { ComponentClass } from "../component/container.ts";
import { Component } from "../component/mod.ts";
import { ECS } from "../ecs.ts";
import { Entity } from "../entity.ts";

export abstract class System {
	protected abstract readonly _componentsRequired: Set<
		ComponentClass<Component>
	>;

	#ecs: ECS;

	public abstract update(entities: Set<Entity>): void;

	constructor(ecs: ECS) {
		this.#ecs = ecs;
	}

	public get componentsRequired(): Set<ComponentClass<Component>> {
		return this._componentsRequired;
	}

	public get ecs(): ECS {
		return this.#ecs;
	}
}
