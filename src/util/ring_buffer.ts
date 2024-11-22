export class RingBuffer<T> {
	private data: T[] = [];
	private readIndex = 0;
	private writeIndex = 0;

	constructor(private capacity: number) {
		if (capacity <= 0) {
			throw Error("RingBuffer capacity must be greater than 0");
		}
	}

	public push(item: T): void {
		if (this.size() === this.capacity) {
			throw Error(
				"RingBuffer has reached max capacity, you cannot add more items",
			);
		}
		this.data[this.writeIndex] = item;
		this.writeIndex = (this.writeIndex + 1) % this.capacity;
	}

	public pop(): T | undefined {
		if (this.size() === 0) {
			return undefined;
		}
		const item = this.data[this.readIndex];
		this.readIndex = (this.readIndex + 1) % this.capacity;
		return item;
	}

	public size(): number {
		return (this.writeIndex - this.readIndex + this.capacity) %
			this.capacity;
	}
}
