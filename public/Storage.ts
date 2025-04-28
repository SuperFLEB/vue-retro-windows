import {setAbortableTimeout} from "@superfleb/abortable";
const APP_PREFIX = "@superfleb/retro-win";

type Updater<T> = (currentValue: T | undefined) => T | undefined;

export interface StorageInterface<T> {
	put(value: T, immediate?: boolean): void;
	get(immediate?: boolean): T | undefined;
	update(updater: Updater<T>): void;
	flush(): void;
	clear(): void;
}

export default class Storage<T> implements StorageInterface<T> {
	constructor(key: string, cacheTime: number = 500) {
		this.#key = `${APP_PREFIX}/${key}`;
		this.#cacheTime = cacheTime;

		this.#source = globalThis.sessionStorage;
	}

	#key: string;
	#source: typeof globalThis.localStorage;
	#value: T | undefined;
	#cacheTime: number;
	#flushAbort: AbortController | undefined;

	#pack(value: T): string {
		return JSON.stringify(value);
	}

	#unpack(value: string): T {
		return JSON.parse(value) as unknown as T;
	}

	#requestFlush() {
		if (this.#flushAbort) {
			this.#flushAbort.abort();
		}
		this.#flushAbort = setAbortableTimeout(() => this.flush(), this.#cacheTime);
	}

	#pull() {
		const value = this.#source.getItem(this.#key);
		this.#value = (value === null) ? undefined : this.#unpack(value);
	}

	#push() {
		if (this.#value === undefined) return;
		this.#source.setItem(this.#key, this.#pack(this.#value));
	}

	update(updater: Updater<T>, immediate: boolean = false) {
		const updated = updater(this.get(immediate));
		if (updated) this.put(updated, immediate);
	}

	put(value: T, immediate: boolean = false) {
		this.#value = value;
		if (immediate) {
			this.flush();
		} else {
			this.#requestFlush();
		}
	}

	get(refresh: boolean = false): T | undefined {
		if (refresh || this.#value === undefined) {
			this.#pull();
		}
		return this.#value as T;
	}

	clear() {
		this.#source.removeItem(this.#key);
	}

	flush() {
		this.#push();
	}
}
