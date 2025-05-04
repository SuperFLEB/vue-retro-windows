import {onMounted, onUnmounted, type ShallowRef} from "vue";

const TAP_TIME = 300;
const DOUBLE_TAP_TIMEOUT = 300;
const LONG_TAP_TIME = 600;
const DRAG_DISTANCE = 10;

class TapEventTracker {
	#comboLength: number = 0;
	#timestamp: number = 0;
	#startXY: [number, number] = [Infinity, Infinity];
	#distance: number = Infinity;
	#touchIdentifier: (Touch["identifier"]) | undefined;
	#target: HTMLElement;
	#longTimeout: ReturnType<typeof setTimeout> | undefined;

	aborter: AbortController;

	#touchStart(e: TouchEvent) {
		if (this.#touchIdentifier !== undefined) return;

		const now = new Date().getTime();
		if (this.#comboLength > 0 && now - this.#timestamp > DOUBLE_TAP_TIMEOUT) {
			this.#comboLength = 0;
		}
		const touch = e.touches[0];
		this.#touchIdentifier = touch.identifier;
		this.#startXY = [touch.clientX, touch.clientY];
		this.#distance = 0;
		this.#timestamp = new Date().getTime();
		this.#longTimeout = setTimeout(() => {
			this.#dispatchLong();
		}, LONG_TAP_TIME);
	}

	#touchMove(e: TouchEvent) {
		if (!e.target) return;
		if (this.#touchIdentifier === undefined) return;
		const touch = Array.from(e.changedTouches).find(t => t.identifier === this.#touchIdentifier)
		if (!touch) return;
		this.#distance = Math.max(this.#distance, Math.hypot(touch.clientX - this.#startXY[0], touch.clientY - this.#startXY[1]));
		if (this.#longTimeout !== undefined && this.#distance > DRAG_DISTANCE) {
			this.#clearLongTimeout();
		}
	}

	#touchEnd(e: TouchEvent): void {
		if (!e.target) return;
		if (this.#touchIdentifier === undefined) return;
		const touch = Array.from(e.changedTouches).find(t => t.identifier === this.#touchIdentifier)
		if (!touch) return;

		// Prevent double-tap zoom, etc., but not single tap click translation
		if (this.#comboLength > 0) e.preventDefault();

		this.#touchIdentifier = undefined;
		this.#clearLongTimeout();

		const now = new Date().getTime();

		if (Math.hypot(touch.clientX - this.#startXY[0], touch.clientY - this.#startXY[1]) > DRAG_DISTANCE) {
			this.#comboLength = 0;
			return;
		}

		if (now - this.#timestamp > TAP_TIME) {
			if (now - this.#timestamp > LONG_TAP_TIME) {
				this.#dispatch("tapholdend");
			}
			this.#comboLength = 0;
			return;
		}

		this.#dispatch("tap");

		if (this.#comboLength > 0) {
			this.#dispatch("taprepeat");
		}

		if (this.#comboLength === 1) {
			this.#dispatch("tapdouble");
		}

		this.#comboLength++;
	}

	#dispatchLong() {
		this.#dispatch("taphold");
	}

	#clearLongTimeout() {
		clearTimeout(this.#longTimeout);
		this.#longTimeout = undefined;
	}

	#dispatch(eventName: string): void {
		console.log("Tap:", eventName);
		this.#target.dispatchEvent(new CustomEvent(eventName));
	}

	constructor(element: HTMLElement, signal?: AbortSignal) {
		this.aborter = new AbortController();
		this.#target = element;
		const signals = signal ? AbortSignal.any([signal, this.aborter.signal]) : this.aborter.signal;
		element.addEventListener("touchstart", (event: TouchEvent) => { this.#touchStart(event); }, { signal: signals });
		element.addEventListener("touchmove", (event: TouchEvent) => { this.#touchMove(event); }, { signal: signals });
		element.addEventListener("touchend", (event: TouchEvent) => { this.#touchEnd(event); }, { signal: signals });
		element.addEventListener("touchcancel", (event: TouchEvent) => { this.#touchEnd(event); }, { signal: signals });
	}
}

export default function watchTapEvents(element: HTMLElement, signal?: AbortSignal) {
	return new TapEventTracker(element, signal).aborter;
}

export function useTapEvents(domRef: Readonly<ShallowRef<HTMLElement | null>>) {
	let aborter: AbortController;
	onMounted(() => {
		if (!domRef.value) throw new Error("useTapEvents did not receive a valid DOM reference");
		return aborter = watchTapEvents(domRef.value);
	});
	onUnmounted(() => {
		return aborter?.abort();
	});
}
