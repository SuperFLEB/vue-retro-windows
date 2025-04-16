import type Box from "@t/Box.ts";
import {charGrid} from "@/themes/Console/constants.ts";

const roundToGrid = (box: Box) => {
	const offset = {
		x: Math.floor(box.x / charGrid.x) * charGrid.x - box.x,
		y: Math.floor(box.y / charGrid.y) * charGrid.y - box.y,
	};

	return {
		top: `${offset.y}px`,
		left: `${offset.x}px`,
		width: `${Math.floor(box.width / charGrid.x) * charGrid.x}px`,
		height: `${Math.floor(box.height / charGrid.y) * charGrid.y}px`,
	};
};

export default roundToGrid;