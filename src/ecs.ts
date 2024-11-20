import { ComponentContainer } from "./component_container";
import { Component } from "./components/component";
import { Entity } from "./entity";
import { System } from "./system";

export class ECS {
    private entities = new Map<Entity, ComponentContainer>();
    private systems = new Map<System, Set<Entity>>();

    private nextEntityID = 0;
    private entitiesToDestroy = new Array<Entity>();

    public addEntity(): Entity {
        const entity = this.nextEntityID;
        this.nextEntityID++;
        this.entities.set(entity, new ComponentContainer());
        return entity;
    }

    /**
     * Marks `entity` for removal. The actual removal happens at the end
     * of the next `update()`. This way we avoid subtle bugs where an
     * Entity is removed mid-`update()`, with some Systems seeing it and
     * others not.
     */
    public removeEntity(entity: Entity): void {
        this.entitiesToDestroy.push(entity);
    }

    // API: Components

    public addComponent(entity: Entity, component: Component): void {
        this.entities.get(entity)?.add(component);
        this.checkE(entity);
    }

    public getComponents(entity: Entity): ComponentContainer {
        return this.entities.get(entity)!;
    }

    public removeComponent(
        entity: Entity,
        componentClass: Function,
    ): void {
        this.entities.get(entity)!.delete(componentClass);
        this.checkE(entity);
    }

    // API: Systems

    public addSystem(system: System): void {
        // Checking invariant: systems should not have an empty
        // Components list, or they'll run on every entity. Simply remove
        // or special case this check if you do want a System that runs
        // on everything.
        if (system.componentsRequired.size == 0) {
            console.warn("System not added: empty Components list.");
            console.warn(system);
            return;
        }

        // Give system a reference to the ECS so it can actually do
        // anything.
        system.ecs = this;

        // Save system and set who it should track immediately.
        this.systems.set(system, new Set());
        for (const entity of this.entities.keys()) {
            this.checkES(entity, system);
        }
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
        this.systems.delete(system);
    }

    /**
     * This is ordinarily called once per tick (e.g., every frame). It
     * updates all Systems, then destroys any Entities that were marked
     * for removal.
     */
    public update(
        _deltaTime: number,
        // later we'll add a way to specify the update order
    ): void {
        // Update all systems. (Later, we'll add a way to specify the
        // update order.)
        for (const [system, entities] of this.systems.entries()) {
            system.update(entities);
        }

        // Remove any entities that were marked for deletion during the
        // update.
        while (this.entitiesToDestroy.length > 0) {
            this.destroyEntity(this.entitiesToDestroy.pop()!);
        }
    }

    // Private methods for doing internal state checks and mutations.

    private destroyEntity(entity: Entity): void {
        this.entities.delete(entity);
        for (const entities of this.systems.values()) {
            entities.delete(entity); // no-op if doesn't have it
        }
    }

    private checkE(entity: Entity): void {
        for (const system of this.systems.keys()) {
            this.checkES(entity, system);
        }
    }

    private checkES(entity: Entity, system: System): void {
        const have = this.entities.get(entity)!;
        const need = system.componentsRequired;
        if (have.hasAll(need)) {
            // should be in system
            this.systems.get(system)!.add(entity); // no-op if in
        } else {
            // should not be in system
            this.systems.get(system)!.delete(entity); // no-op if out
        }
    }
}
