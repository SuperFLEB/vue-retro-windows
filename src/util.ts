import type XY from "@t/XY.ts";
import type {Dimension} from "@t/scroll.ts";
import type Box from "@t/Box.ts";
import type {CSSProperties, Ref} from "vue";

// Take any object with an "x" and "y" property and only return those properties. Or, convert a 2-dimensional array to an XY.
export const xyOf = (xy: XY | [number, number]) => {
	return Array.isArray(xy) ? {x: xy[0], y: xy[1]} : {x: xy.x, y: xy.y};
};

// Take an "x" or "y" dimension, a value, and optionally an other-value, and make an XY.
export const xyOfDim = (dimension: Dimension, value: number, otherValue: number = 0) => ({
	x: otherValue,
	y: otherValue,
	[dimension]: value
});

type Entry<T extends Record<string, any>> = { [K in keyof T]: [K, T[K]] }[keyof T];

export const filterObject = <T extends Record<string, any>>(obj: T, filter: ((e: Entry<T>) => boolean)) =>
	Object.fromEntries((Object.entries(obj)).filter(filter));

export function deepAssign(source: Record<string, any>, target: Record<string, any>) {
	if (source === null || typeof source !== "object" || typeof target !== "object") {
		throw new Error("Could not assign to a non-object");
	}
	const assignables: Record<string, unknown> = {};
	for (const entry of Object.entries(source)) {
		if (entry[1] === target[entry[0]]) continue;
		if (entry[1] !== null && typeof entry[1] === "object" && typeof target[entry[0]] === "object") {
			deepAssign(entry[1], target[entry[0]]);
		}
		assignables[entry[0]] = entry[1];
	}
	Object.assign(target, assignables);
}


const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_";
export const randomString = (length = 5, prefix = "", suffix = "") =>
	prefix +
	Array.from(crypto.getRandomValues(new Uint8Array(length)))
		.map((char) => charset[char % charset.length])
		.join("") +
	suffix;

function assertValidBox(obj: any): asserts obj is Box {
	for (const v of Object.values(obj)) {
		if (v === undefined || v === null) throw new Error("Invalid box. If you want to filter undefined and null, you must pass the filterUndefinedAndNull flag.");
	}
}

export function boxOf(obj: Partial<Box>, filterUndefinedAndNull: true): Partial<Box>;
export function boxOf(obj: Partial<Box>, filterUndefinedAndNull?: false): Box;
export function boxOf(obj: Partial<Box>, filterUndefinedAndNull: boolean = false): Box | Partial<Box> {
	const box: Partial<Box> = {
		x: obj.x,
		y: obj.y,
		width: obj.width,
		height: obj.height,
	};

	if (filterUndefinedAndNull) return filterObject<Box>(box as Box, ([_, v]) => !(([null, undefined] as any[]).includes(v))) as Partial<Box>;
	assertValidBox(box);
	return box;
}

export const stylesOf = (dims: XY | Box): CSSProperties => Object.fromEntries(Object.entries({
	left: dims.x,
	top: dims.y,
	width: "width" in dims ? dims.width : undefined,
	height: "height" in dims ? dims.height : undefined,
}).filter(([_, v]) => v !== undefined).map(([k, v]) => [k, `${v}px`]));

export function isRefSet<T>(r: Ref<T | null>): r is Ref<T> {
	return !(r.value === null);
}
