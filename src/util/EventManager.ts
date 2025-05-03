type Handler = (params: any) => void;
type EventType = string | symbol;

const DISPATCH_SYM = Symbol("dispatch");

class EventManager {
	#handlers: Map<EventType, Set<Handler>> = new Map();
	#cleanupAbortControllers: Map<EventType, Map<Handler, AbortController>> = new Map();

	public static create(): [EventManager, ((key: EventType, eventData: any) => void)] {
		const instance = new EventManager();
		return [ instance, instance[DISPATCH_SYM].bind(instance) ];
	}

	[DISPATCH_SYM](key: EventType, eventData: any) {
		const handlers = this.#handlers.get(key);
		if (!handlers) return;
		handlers.forEach((handler: Handler) => handler(eventData));
	}

	addEventHandler(key: EventType, handler: Handler, signal?: AbortSignal) {
		if (signal) {
			if (!this.#cleanupAbortControllers.has(key)) this.#cleanupAbortControllers.set(key, new Map());
			let cleanupController = this.#cleanupAbortControllers.get(key)!.get(handler);
			if (!cleanupController || cleanupController.signal.aborted) {
				cleanupController = new AbortController();
				this.#cleanupAbortControllers.get(key)!.set(handler, cleanupController);
			}
			signal.addEventListener("abort", this.removeEventHandler.bind(this, key, handler), { signal: cleanupController.signal });
		}
		const handlers = this.#handlers.get(key) ?? new Set();
		handlers.add(handler);
		this.#handlers.set(key, handlers);
	}

	removeEventHandler(key: EventType, handler: Handler) {
		this.#handlers.get(key)?.delete(handler);
		this.#cleanupAbortControllers.get(key)?.get(handler)?.abort();
	}
}

export default EventManager;
