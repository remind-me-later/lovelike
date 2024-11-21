import { Component } from "./components/component";

// deno-lint-ignore no-explicit-any
export type ComponentClass<T extends Component> = new (...args: any[]) => T;

export class ComponentContainer {
    // deno-lint-ignore ban-types
    private map = new Map<Function, Component>();

    public add<T extends Component>(component: T): void {
        this.map.set(component.constructor, component);
    }

    public get<T extends Component>(
        componentClass: ComponentClass<T>,
    ): T | undefined {
        return this.map.get(componentClass) as T | undefined;
    }

    public has<T extends Component>(
        componentClass: ComponentClass<T>,
    ): boolean {
        return this.map.has(componentClass);
    }

    public hasAll(
        componentClasses: Set<ComponentClass<Component>>,
    ): boolean {
        for (const componentClass of componentClasses) {
            if (!this.map.has(componentClass)) {
                return false;
            }
        }
        return true;
    }

    public delete<T extends Component>(
        componentClass: ComponentClass<T>,
    ): void {
        this.map.delete(componentClass);
    }
}
