import {onMounted, onUnmounted, type ShallowRef} from "vue";

export default function useRoundedSize(elementRef: Readonly<ShallowRef<HTMLElement | null>>, x: number, y: number) {
	const onResize = ([entry]: ResizeObserverEntry[]) => {
		const element = elementRef.value!;
		const elementSize = {x: entry.contentBoxSize[0].inlineSize, y: entry.contentBoxSize[0].blockSize};

		const pad = {
			x: (Math.ceil(elementSize.x / x) * x) - elementSize.x,
			y: (Math.ceil(elementSize.y / y) * y) - elementSize.y,
		};

		if (elementSize.x >= 1) {
			element.style.setProperty("padding-bottom", pad.x + "px");
		}
		if (elementSize.y >= 1) {
			element.style.setProperty("padding-right", pad.y + "px");
		}
	};

	const observer = new ResizeObserver(onResize);
	onMounted(() => {
		if (!elementRef.value) throw new Error("useRoundedSize got an invalid element ref");
		console.log("Hello resize");
		observer.observe(elementRef.value);
	});

	onUnmounted(() => {
		console.log("Goodbye Resized");
		observer.disconnect();
	});
}