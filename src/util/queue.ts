export class Queue<T> {
    private data: T[] = [];

    constructor(private capacity: number = Infinity) {}

    enqueue(item: T): void {
        if (this.size() === this.capacity) {
            throw Error(
                "Queue has reached max capacity, you cannot add more items",
            );
        }
        this.data.push(item);
    }

    dequeue(): T | undefined {
        return this.data.shift();
    }

    size(): number {
        return this.data.length;
    }
}
