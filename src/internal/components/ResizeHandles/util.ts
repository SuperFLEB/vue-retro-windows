import type Box from "@t/Box.ts";
import type CardinalCorner from "@t/CardinalCorner.ts";
import type XY from "@t/XY.ts";

export const getCornerPoint = (box: Box, corner: CardinalCorner): XY => {
	const xy: XY = { x: box.x, y: box.y };
	if (corner[1] === "e") xy.x += box.width;
	if (corner[0] === "s") xy.y += box.height;
	return xy;
};

export const moveBoxCorner = (box: Box, xy: XY, corner: CardinalCorner, minWinSize: XY): Box => {
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
