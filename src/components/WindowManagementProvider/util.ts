import type {WinId, WinManRegistry} from "@t/WinMan.ts";
import type Box from "@t/Box.ts";
import type CardinalCorner from "@t/CardinalCorner.ts";
import type XY from "@t/XY.ts";

/**
 * Rearrange windows' z-index to shift the targeted window to the front.
 * This will mutate the given WinManRegistry.
 * @param registry
 * @param winId
 * @returns void
 */
export const unshiftZ = (registry: WinManRegistry, winId: WinId) => {
	const keys = Object.keys(registry);
	const total = keys.length;
	keys.sort((a, b) => registry[a].z - registry[b].z);
	let gap = 0;

	keys.forEach((key, idx) => {
		registry[key].z = key === winId.toString() ? total - ++gap : idx - gap;
	});

	return;
};

export const moveBoxCorner = (box: Box, xy: XY, corner: CardinalCorner, minWinSize: XY = {x: 0, y: 0}): Box => {
	const newBox: Box = { ...box };

	if (corner[1] === "w") {
		newBox.x = xy.x;
		newBox.width = box.x + box.width - xy.x;
	}
	if (corner[0] === "n") {
		newBox.y = xy.y;
		newBox.height = box.y + box.height - xy.y;
	}

	if (corner[1] === "e") newBox.width = xy.x - newBox.x;
	if (corner[0] === "s") newBox.height = xy.y - newBox.y;

	newBox.width = Math.max(minWinSize.x, newBox.width);
	newBox.height = Math.max(minWinSize.y, newBox.height);

	return newBox;
};
