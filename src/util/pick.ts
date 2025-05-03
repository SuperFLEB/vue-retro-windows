export function pickArray<T extends any[]>(arr: T, indices: number[], sparse: boolean = false): T[number][] {
	const result = [];
	for (const index in indices) {
		if (sparse) {
			result[index] = arr[index];
		} else {
			result.push(arr[index]);
		}
	}
	return result;
}

export function pick<T extends Record<string|symbol, any>>(obj: T, keys: Readonly<Array<keyof T>>): Partial<T> {
	return Object.fromEntries(Object.entries(obj).filter(([k]) => keys.includes(k))) as Partial<T>;
}

export default pick;