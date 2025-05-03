export function* map<TIn, TOut>(iterable: Iterable<TIn>, mapper: (element: TIn, index: number) => TOut) {
	let index = 0;
	for (const item of iterable) {
		yield mapper(item, index++);
	}
	return;
}

export function* filter<T>(iterable: Iterable<T>, test: (element: T, index: number) => boolean) {
	let index = 0;
	for (const item of iterable) {
		if (test(item, index++)) yield item;
	}
	return;
}

export function find<T>(iterable: Iterable<T>, test: (element: T, index: number) => boolean) {
	const first = filter(iterable, test).next();
	if (first.done) return undefined;
	return first.value;
}

export function includes<T>(iterable: Iterable<T>, needle: T) {
	for (const item of iterable) {
		if (item === needle) return true;
	}
	return false;
}

export default class Itermore<T> {
	#iterator: Iterable<T>
	constructor(iterable: Iterable<T>) {
		this.#iterator = iterable;
	}
	[Symbol.iterator]() {
		return this.#iterator[Symbol.iterator]();
	}
	map<TOut>(test: (item: T, index: number) => TOut) {
		return new Itermore<TOut>(map(this.#iterator, test));
	}
	filter(test: (item: T, index: number) => boolean) {
		return new Itermore<T>(filter(this.#iterator, test));
	}
	find(test: (item: T, index: number) => boolean) {
		return find(this.#iterator, test);
	}
	includes(needle: T) {
		return includes(this.#iterator, needle);
	}
	toArray() {
		return Array.from(this.#iterator);
	}
}