import { ComponentClass, ComponentContainer } from "./component_container.ts";
import { Component } from "./components/component.ts";
import { Entity } from "./entity.ts";
import { System } from "./systems/system.ts";

export class ECS {
	#entities = new Map<Entity, ComponentContainer>();
	#systems = new Map<System, Set<Entity>>();
	#priorities = new Array<number>();
	#updateMap = new Map<number, Set<System>>();

	#nextEntityID = 0;
	#entitiesToDestroy = new Array<Entity>();

	public addEntity(): Entity {
		const entity = this.#nextEntityID;
		this.#nextEntityID++;
		this.#entities.set(entity, new ComponentContainer());
		return entity;
	}

	/**
	 * Marks `entity` for removal. The actual removal happens at the end
	 * of the next `update()`. This way we avoid subtle bugs where an
	 * Entity is removed mid-`update()`, with some Systems seeing it and
	 * others not.
	 */
	public removeEntity(entity: Entity): void {
		this.#entitiesToDestroy.push(entity);
	}

	// API: Components

	public addComponent(entity: Entity, component: Component): void {
		this.#entities.get(entity)?.add(component);
		this.#checkE(entity);
	}

	public getComponents(entity: Entity): ComponentContainer {
		return this.#entities.get(entity)!;
	}

	public removeComponent<T extends Component>(
		entity: Entity,
		componentClass: ComponentClass<T>,
	): void {
		this.#entities.get(entity)!.delete(componentClass);
		this.#checkE(entity);
	}

	// API: Systems

	public addSystem(priority: number, system: System): void {
		if (system.componentsRequired.size === 0) {
			console.warn("System not added: empty Components list.");
			console.warn(system);
			return;
		}

		this.#systems.set(system, new Set());
		for (const entity of this.#entities.keys()) {
			this.#checkES(entity, system);
		}

		this.#priorities = Array.from(
			(new Set(this.#priorities)).add(priority),
		);

		this.#priorities.sort((a: number, b: number) => {
			return a - b;
		});

		if (!this.#updateMap.has(priority)) {
			this.#updateMap.set(priority, new Set<System>());
		}

		this.#updateMap.get(priority)!.add(system);
	}

	/**
	 * Note: I never actually had a removeSystem() method for the entire
	 * time I was programming the game Fallgate (2 years!). I just added
	 * one here for a specific testing reason (see the next post).
	 * Because it's just for demo purposes, this requires an actual
	 * instance of a System to remove (which would be clunky as a real
	 * API).
	 */
	public removeSystem(system: System): void {
		this.#systems.delete(system);
	}

	/**
	 * This is ordinarily called once per tick (e.g., every frame). It
	 * updates all Systems, then destroys any Entities that were marked
	 * for removal.
	 */
	public update(_deltaTime: number): void {
		// Call update on all systems in priority order.
		for (const priority of this.#priorities) {
			const systems = this.#updateMap.get(priority)!;
			for (const sys of systems.values()) {
				sys.update(this.#systems.get(sys)!);
			}
		}

		// Remove any entities that were marked for deletion during the
		// update.
		// while (this.entitiesToDestroy.length > 0) {
		//     this.destroyEntity(this.entitiesToDestroy.pop()!);
		// }
	}

	// Private methods for doing internal state checks and mutations.

	// #destroyEntity(entity: Entity): void {
	//     this.entities.delete(entity);
	//     for (const entities of this.systems.values()) {
	//         entities.delete(entity); // no-op if doesn't have it
	//     }
	// }

	#checkE(entity: Entity): void {
		for (const system of this.#systems.keys()) {
			this.#checkES(entity, system);
		}
	}

	#checkES(entity: Entity, system: System): void {
		const have = this.#entities.get(entity)!;
		const need = system.componentsRequired;
		if (have.hasAll(need)) {
			// should be in system
			this.#systems.get(system)!.add(entity); // no-op if in
		} else {
			// should not be in system
			this.#systems.get(system)!.delete(entity); // no-op if out
		}
	}
}
