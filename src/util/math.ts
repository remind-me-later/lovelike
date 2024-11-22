export class MyMath {
	public static clamp(value: number, min: number, max: number): number {
		return Math.min(Math.max(value, min), max);
	}

	public static clampAbs(value: number, max: number): number {
		return Math.min(Math.abs(value), max) * Math.sign(value);
	}
}
