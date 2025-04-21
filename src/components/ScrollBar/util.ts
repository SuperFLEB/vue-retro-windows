import type {Dimension, Dimensional, DimensionalDirectional} from "@t/scroll";
import type {LinearScrollState, ScrollState} from "./types.ts";
import clamp from "@/util/clamp.ts";

type ElementAdjective = "offset" | "client" | "scroll";

export const posStyles: DimensionalDirectional<string> = {
	x: { fwd: "right", back: "left" },
	y: { fwd: "bottom", back: "top" },
};

export const lengthStyles: Dimensional<string> = { x: "width", y: "height" };

export const antidimension = (dimension: Dimension): Dimension => ({
	x: "y" as Dimension,
	y: "x" as Dimension,
}[dimension]);

export const getScrollProportion = (
	scrollState: LinearScrollState,
	pages = 0,
	pixels = 0,
): number => {
	return pages * scrollState.windowSize + pixels / scrollState.pxScrollSize;
};
export const offsetLength = (element: HTMLElement, dimension: Dimension) =>
	(dimension === "x" ? element?.offsetWidth : element?.offsetHeight) ?? 0;
export const fixedThumbPosition = (at: number, trackSize: number, thumbSize: number) =>
	clamp(at * trackSize - thumbSize * at, 0, trackSize - thumbSize);
export const fixedThumbPixelToScroll = (scrollState: LinearScrollState, trackSize: number, thumbSize: number) =>
	(1 - scrollState.windowSize) / (trackSize - thumbSize);
export const otherDimension = (dimension: Dimension) => (dimension === "x" ? "y" : "x");
export const pos = (adjective: ElementAdjective, dimension: Dimension) =>
	(adjective + { x: "Left", y: "Top" }[dimension]) as `${ElementAdjective}${"Left" | "Top"}`;
export const size = (adjective: ElementAdjective, dimension: Dimension) =>
	(adjective + { x: "Width", y: "Height" }[dimension]) as `${ElementAdjective}${"Width" | "Height"}`;
export const scrolls = (element: HTMLElement, dimension: Dimension) =>
	element[size("scroll", dimension)] > element[size("client", dimension)];
export const toXY = (state: ScrollState) => ({ x: state.x.pxStart, y: state.y.pxStart });
export const percent = (decimal: number) => (decimal * 100).toFixed(2) + "%";
