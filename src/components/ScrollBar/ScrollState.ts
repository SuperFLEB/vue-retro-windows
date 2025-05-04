import {ScrollStateActionSource, ScrollStateActionType} from "./types.ts";
import {pos, size} from "./util";
import type {Dimension} from "@t/scroll";
import type {LinearScrollState, ScrollState, ScrollStateAction,} from "./types.ts";
import clamp from "@/util/clamp.ts";

type EnoughLinearScrollProperties = Pick<LinearScrollState, "pxStart" | "pxWindowSize" | "pxScrollSize" | "windowSize">;

const updateScrollPointPx = (
	partial: EnoughLinearScrollProperties,
	pxStart: number,
): LinearScrollState => {
	const pxMax = partial.pxScrollSize - partial.pxWindowSize;
	const max = pxMax / partial.pxScrollSize;
	const start = clamp(pxStart / partial.pxScrollSize, 0, max);
	const mid = start + partial.windowSize / 2;
	const at = partial.windowSize < 1 ? start / (1 - partial.windowSize) : 0;

	return {
		...partial,
		start,
		mid,
		at,
		pxStart: start * partial.pxScrollSize,
		pxMax,
		max,
	} as LinearScrollState;
};

const updateScrollPoint = (
	dimState: LinearScrollState,
	proposedStart: number,
): LinearScrollState => {
	const max = 1 - dimState.windowSize;
	const pxMax = max * dimState.pxScrollSize;
	const start = clamp(proposedStart, 0, 1 - dimState.windowSize);
	const mid = start + dimState.windowSize / 2;
	const at = dimState.windowSize < 1 ? start / (1 - dimState.windowSize) : 0;
	const pxStart = start * dimState.pxScrollSize;

	return {
		...dimState,
		start,
		mid,
		at,
		pxStart,
		max,
		pxMax
	};
};

const incrementScrollPointPx = (dimState: LinearScrollState, pxDelta: number) =>
	updateScrollPointPx(dimState, dimState.pxStart + pxDelta);
const incrementScrollPoint = (dimState: LinearScrollState, delta: number) =>
	updateScrollPoint(dimState, dimState.start + delta);

const setScrollPropertiesFromElement = (
	dimState: LinearScrollState,
	dimension: Dimension,
	element: HTMLElement,
): LinearScrollState => {
	const pxWindowSize: number = element[size("client", dimension)];
	const pxScrollSize: number = element[size("scroll", dimension)];
	const windowSize = pxWindowSize / pxScrollSize;
	const partial: EnoughLinearScrollProperties = {
		pxStart: element[pos("scroll", dimension)],
		pxWindowSize,
		pxScrollSize,
		windowSize,
	};

	return {
		...dimState,
		...partial,
		...updateScrollPointPx(partial, partial.pxStart),
	};
};
export const setupScroll = (): ScrollState => {
	return {
		x: {
			start: 0,
			mid: 0,
			at: 0,
			pxStart: 0,
			pxWindowSize: 0,
			pxScrollSize: 0,
			windowSize: 0,
			max: 0,
			pxMax: 0,
			dimension: "x",
		},
		y: {
			start: 0,
			mid: 0,
			at: 0,
			pxStart: 0,
			pxWindowSize: 0,
			pxScrollSize: 0,
			windowSize: 0,
			max: 0,
			pxMax: 0,
			dimension: "y",
		},
		source: ScrollStateActionSource.INITIAL,
	} as ScrollState;
};

export const scrollStateUpdater = (state: /* reactive */ ScrollState, action: ScrollStateAction): ScrollState => {
	// Validation. Break on success, return on error.
	switch (action.type) {
		case ScrollStateActionType.apply:
			break;
		default:
			if (state.initialized) break;
			console.warn(
				`Scrollbar updater action (${action.type}) with an uninitialized scrollbar. Use the ScrollActionType.apply action first.`,
			);
			return state;
	}

	switch (action.type) {
		case ScrollStateActionType.scrollTo:
			state.source = action.source ?? ScrollStateActionSource.EXTERNAL;
			state.x = typeof action.x === 'number' ? updateScrollPointPx(state.x, action.x) : state.x;
			state.y = typeof action.y === 'number' ? updateScrollPointPx(state.y, action.y) : state.y;
			return state;
		case ScrollStateActionType.scrollToFraction:
			state.source = action.source ?? ScrollStateActionSource.EXTERNAL;
			state.x = typeof action.x === 'number' ? updateScrollPoint(state.x, action.x) : state.x;
			state.y = typeof action.y === 'number' ? updateScrollPoint(state.y, action.y) : state.y;
			return state;
		case ScrollStateActionType.scrollByFraction:
			state.source = action.source ?? ScrollStateActionSource.EXTERNAL;
			state.x = typeof action.x === 'number' ? incrementScrollPoint(state.x, action.x) : state.x;
			state.y = typeof action.y === 'number' ? incrementScrollPoint(state.y, action.y) : state.y;
			return state;
		case ScrollStateActionType.scrollBy:
			state.source = action.source ?? ScrollStateActionSource.EXTERNAL;
			state.x = typeof action.x === 'number' ? incrementScrollPointPx(state.x, action.x) : state.x;
			state.y = typeof action.y === 'number' ? incrementScrollPointPx(state.y, action.y) : state.y;
			return state;
		case ScrollStateActionType.apply:
			state.source = action.source ?? ScrollStateActionSource.EXTERNAL;
			state.x = setScrollPropertiesFromElement(state.x, "x", action.element);
			state.y = setScrollPropertiesFromElement(state.y, "y", action.element);
			state.initialized = true;
			return state;
	}
};

export default scrollStateUpdater;
