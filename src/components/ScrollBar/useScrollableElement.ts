import {computed, type ComputedRef, type Ref, ref, watch} from "vue";
import useScroll from "@/components/ScrollBar/useScroll.ts";
import useTheme from "@/providers/ThemeProvider/useTheme.ts";
import {type ScrollState, ScrollStateActionSource} from "@/components/ScrollBar/types.ts";
import {ComposableOutOfContextError} from "@/errors.ts";
import type XY from "@t/XY.ts";
import debug from "@/debug";
import type {ScrollInterface} from "@/components/ScrollBar/ScrollProvider.vue";
import type {ThemeProviderInterface} from "@/providers/ThemeProvider/types.ts";

type Mount = (props: {
	element: HTMLElement,
	calipers: HTMLElement | null,
	scrollState: ScrollState,
	scrollInterface: ScrollInterface,
	getCurrentThemeInfo: ThemeProviderInterface["getCurrentThemeInfo"] | null,
	abortSignal: AbortSignal
}) => void;

const mount: Mount = ({element, calipers, scrollState, scrollInterface, getCurrentThemeInfo, abortSignal}) => {
		let lastScrollSize: XY = { x: element.scrollWidth, y: element.scrollHeight };

		if (abortSignal.aborted) {
			throw new Error("Attempted to mount useScrollableElement with an already-aborted signal. This shouldn't ever happen. Weird.");
		}

		element.scrollTo(scrollState.x.pxStart, scrollState.y.pxStart);

		const apply = (source: ScrollStateActionSource) => {
			scrollInterface.updateFromElement(element, source);
			scrollInterface.setRequiredFromElement(element);
		};

		const applyScroll = (e: Event) => {
			apply(ScrollStateActionSource.SCROLL);
			e.preventDefault();
		};

		const applyReflow = () => {
			apply(ScrollStateActionSource.REFLOW);
		};

		const applyReflowIfNecessary = () => {
			if (element.scrollWidth === lastScrollSize.x && element.scrollHeight === lastScrollSize.y) return;
			lastScrollSize = { x: element.scrollWidth, y: element.scrollHeight };
			applyReflow();
		}

		element.addEventListener("scroll", applyScroll, { signal: abortSignal });
		element.addEventListener("load", applyReflow, { signal: abortSignal });

		const resOb = new ResizeObserver(() => {
			applyReflowIfNecessary();
		});
		const mutOb = new MutationObserver(() => {
			applyReflowIfNecessary();
		});
		resOb.observe(element);
		if (calipers) resOb.observe(calipers);
		mutOb.observe(element, {
			childList: true,
			subtree: true,
		});

		if (scrollState.initialized) {
			setTimeout(() => {
				// This is a remount, so restore scroll position to where the scrollState says it should be
				element.scroll(scrollState.x.start * element.scrollWidth, scrollState.y.start * element.scrollHeight);
				scrollInterface.setRequiredFromElement(element);
			}, 0);
		} else {
			apply(ScrollStateActionSource.INITIAL);
		}

		const simulateScrollEvent = (e: WheelEvent) => {
			e.preventDefault();
			let multiplier: XY = {x: 1, y: 1};
			switch (e.deltaMode) {
				case WheelEvent.DOM_DELTA_PIXEL:
					multiplier = {x: 1, y: 1};
					break;
				case WheelEvent.DOM_DELTA_PAGE:
					multiplier = {x: element.clientWidth, y: element.clientHeight};
					break;
				case WheelEvent.DOM_DELTA_LINE:
					multiplier = {x: 10, y: 10};
			}

			const delta = {x: e.deltaX * multiplier.x, y: e.deltaY * multiplier.y};
			scrollInterface.scrollByPx(delta, ScrollStateActionSource.SIMULATED);
		};

		if (getCurrentThemeInfo && getCurrentThemeInfo().hijackScroll) {
			element.addEventListener("wheel", simulateScrollEvent);
		}

		abortSignal.addEventListener("abort", (_: Event) => {
			resOb.disconnect();
			mutOb.disconnect();
		});
	}
;

export const useScrollableElement = (elementRef: Ref<HTMLElement>, calipersElementRef?: Ref<HTMLElement|null>) => {
	const {state: scrollState, interface: scrollInterface} = useScroll();
	let getCurrentThemeInfo = null;
	try {
		getCurrentThemeInfo = useTheme().interface.getCurrentThemeInfo;
	} catch (e) {
		if (!(e instanceof ComposableOutOfContextError)) throw e;
	}

	const scrollStateInitialized = computed(() => scrollState.value.initialized);

	const abortRef = ref<AbortController>(null!);
	abortRef.value ??= new AbortController();

	watch(
		[elementRef, calipersElementRef, scrollStateInitialized] as [Ref<HTMLElement>, Ref<HTMLElement | null>, ComputedRef<boolean>],
		(
			[elementIs, calipersIs, isInitialized],
			[elementWas, calipersWas, wasInitialized]
		) => {
		if (!elementIs) return null;
		if (elementIs === elementWas && isInitialized === wasInitialized) return null;

		if (elementIs !== elementWas || calipersIs !== calipersWas || calipersElementRef || !isInitialized) {
			// On element change, reinitialize
			debug.log(`Scroll unmount/remount due to ${isInitialized ? "changes in element or scroll readiness" : "initialization"}`);
			scrollInterface.updateFromElement(elementIs);

			abortRef.value.abort();
			abortRef.value = new AbortController();

			mount({
				element: elementIs,
				calipers: calipersIs,
				scrollState: scrollState.value,
				getCurrentThemeInfo,
				scrollInterface,
				abortSignal: abortRef.value.signal,
			});
		}
	}, {immediate: true, deep: false});

	const scrollStateXY = computed(() => ({
		x: scrollState.value.x.pxStart,
		y: scrollState.value.y.pxStart,
		initialized: scrollState.value.initialized,
	}));

	watch(scrollStateXY, () => {
		elementRef.value.scrollLeft = scrollStateXY.value.x;
		elementRef.value.scrollTop = scrollStateXY.value.y;
	});
};

