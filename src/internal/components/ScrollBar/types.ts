import type { Dimension, Dimensional } from "@t/scroll.ts";

export type LinearScrollState = {
	start: number;
	mid: number;
	at: number;
	pxStart: number;
	pxWindowSize: number;
	pxScrollSize: number;
	windowSize: number;
	dimension: Dimension;
};

export type ScrollState = Dimensional<LinearScrollState> & {
	initialized: boolean;
	source: ScrollStateActionSource;
};

export const enum ScrollStateActionType {
	scrollTo = "SCROLL_TO",
	scrollBy = "SCROLL_BY",
	scrollToFraction = "SCROLL_TO_PROPORTION",
	scrollByFraction = "SCROLL_BY_PROPORTION",
	apply = "APPLY",
}

export const enum ScrollStateActionSource {
	SCROLL = "SCROLL",
	SIMULATED = "SIMULATED",
	REFLOW = "REFLOW",
	INITIAL = "INITIAL",
	EXTERNAL = "EXTERNAL",
}

type XYAction = {
	x?: number | null;
	y?: number | null;
	source?: ScrollStateActionSource;
	type:
		| ScrollStateActionType.scrollTo
		| ScrollStateActionType.scrollBy
		| ScrollStateActionType.scrollByFraction
		| ScrollStateActionType.scrollToFraction;
};

type ElementAction = {
	type: ScrollStateActionType.apply;
	element: HTMLElement;
	source?: ScrollStateActionSource;
};

export type ScrollStateAction = XYAction | ElementAction;

export type Overflow = "auto" | "hidden" | "scroll";
export type Overflows =
	| {
	x: Overflow;
	y: Overflow;
	overflow?: Overflow;
}
	| {
	x?: Overflow;
	y?: Overflow;
	overflow: Overflow;
};

export const enum ScrollBarSettingsActionType {
	setOverflows = "SET_OVERFLOWS",
	setRequired = "SET_REQUIRED",
	update = "UPDATE",
}

export type LinearScrollBarSettings = {
	overflow: Overflow;
	required: boolean;
	visible: boolean;
};

export type DeadSpaceMeta = {
	required: boolean;
	visible: boolean;
};

export type ScrollBarSettings = Dimensional<LinearScrollBarSettings> & {
	dead: DeadSpaceMeta;
};

export type SetOverflowsAction = {
	type: ScrollBarSettingsActionType.setOverflows;
} & Overflows;

export type SetRequiredAction = {
	type: ScrollBarSettingsActionType.setRequired;
	x?: boolean;
	y?: boolean;
	dead?: boolean;
};

export type UpdateAction = {
	type: ScrollBarSettingsActionType.update;
	settings: Partial<ScrollBarSettings>;
}

export type ScrollBarSettingsAction =
	| SetOverflowsAction
	| SetRequiredAction
	| UpdateAction;
