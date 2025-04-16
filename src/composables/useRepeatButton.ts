import {onUnmounted, ref} from "vue";

const useRepeatButton = (onTick: (e: MouseEvent, ...params: any[]) => void, repeatTimeout: number = 500) => {
	const intervalRef = ref<number | null>(null);
	const elementRef = ref<HTMLElement | null>(null);
	let initialEvent: MouseEvent;

	let abort: AbortController;
	let extraParams: any[] = [];

	const mouseDownHandler = (e: MouseEvent, ...etc: any[]) => {
		if (e.type !== "mousedown") {
			console.warn(`useRepeatButton: mouseDownHandler attached to ${e.type} event, not mousedown. This may cause bugs.`);
		}
		elementRef.value = e.target as HTMLElement;
		start(e, etc);
	};

	const start = (e: MouseEvent, etc: any[]) => {
		initialEvent = e;
		extraParams = etc;
		if (abort && !abort.signal.aborted) {
			stop();
		}
		abort = new AbortController();

		window.addEventListener("mouseup", stop, { signal: abort.signal });
		window.addEventListener("mouseleave", pause, { signal: abort.signal });

		if (intervalRef.value) clearInterval(intervalRef.value);
		const tick = (() => onTick(e, ...etc));
		intervalRef.value = setInterval(tick, repeatTimeout);
		tick();
	};

	const restart = () => {
		start(initialEvent, extraParams);
	}

	const pause = () => {
		if (intervalRef.value) clearInterval(intervalRef.value);
		if (!elementRef.value) return;
		elementRef.value.addEventListener("mouseenter", restart, { signal: abort.signal });
	};

	const stop = () => {
		if (intervalRef.value) clearInterval(intervalRef.value);
		if (abort) abort.abort();
	};

	const cleanup = () => {
		stop();
		elementRef.value = null;
	};

	onUnmounted(cleanup);

	return {mouseDownHandler, emergencyStop: stop};
};

export default useRepeatButton;
