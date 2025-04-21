import {charGrid} from "../../constants.ts";

const makeBackgroundTile = ({pattern = "▒", fontspec = "", repeats = 5, color = "#ccc"}) => {
	const split = pattern.split("\n");
	const rows = split.length;
	const cols = Math.max(...split.map((row) => row.length));
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");

	if (!context) throw new Error("2D canvas context unavailable. Your browser is old or something is broken.");

	canvas.width = cols * charGrid.x * repeats;
	canvas.height = rows * charGrid.y * repeats;

	context.fillStyle = color;
	context.font = fontspec;
	context.textBaseline = "top";

	let y = 10;
	for (let rep = 0; rep < repeats; rep++) {
		for (const text of split) {
			const filled = (text + " ".repeat(cols)).slice(0, cols).repeat(repeats);
			context.fillText(filled, 0, y);
			y += charGrid.y;
		}
	}

	return canvas.toDataURL("image/png").toString();
};

export default makeBackgroundTile;
