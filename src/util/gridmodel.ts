import type XY from "@t/XY.js";

type GridCellModel = {
	row: number;
	column: number;
	x: number;
	y: number;
	width: number;
	height: number;
	elements: HTMLElement[];
};

type GridCellChildPosition = {
	inGrid: boolean;
	row: number | null;
	column: number | null;
	ambiguous: { row: boolean; column: boolean; };
};

type GridCellChild = GridCellChildPosition & {
	element: HTMLElement;
};

export type GridModel = {
	columnStops: number[];
	rowStops: number[];
	cells: GridCellModel[][];
	cellsSequential: GridCellModel[];
	children: GridCellChild[];
	clientOrigin: XY;
	rtl: boolean;
};

function lengthsToStops(lengths: number[], gap: number): number[] {
	let ptr = -gap;
	const stops = [0, ...lengths].map(len => ptr += (len + gap));
	// Grids have no trailing gap either, so subtract that from the last stop.
	stops[stops.length - 1] -= gap;
	return stops;
}

function dePx(str: string): number {
	return Number(str.replace("px", ""));
}

function findStop(position: number, stops: number[]): number | null {
	const exactStop = stops.findIndex(stop => stop === position);
	if (exactStop !== -1) return exactStop;
	const stopAfter = stops.findIndex(stop => stop >= position);
	if (stopAfter > 0 && stopAfter < stops.length) return stopAfter - 1;
	return null;
}

function getGridPosition(element: HTMLElement, model: Omit<GridModel, "children">, gridStyle: CSSStyleDeclaration): GridCellChildPosition {
	const style = getComputedStyle(element);
	const inGrid = ["static", "relative"].includes(style.position) && style.display !== "none";

	if (!inGrid) return {
		inGrid,
		row: null,
		column: null,
		ambiguous: {row: true, column: true},
	};

	const cssColumn: string | undefined = style.getPropertyValue("grid-column").match(/^[0-9]+$/)?.[0];
	const cssRow: string | undefined = style.getPropertyValue("grid-row").match(/^[0-9]+$/)?.[0];

	const offsetLeft = cssColumn ? undefined : element.offsetLeft - dePx(style.marginLeft) - (style.position === "static" ? 0 : dePx(style.left) - dePx(gridStyle!.getPropertyValue("padding-left")));
	const offsetTop = cssRow ? undefined : element.offsetTop - dePx(style.marginTop) - (style.position === "static" ? 0 : dePx(style.top) - dePx(gridStyle!.getPropertyValue("padding-top")));

	const column = cssColumn ? Number(cssColumn) : findStop(offsetLeft!, model.columnStops);
	const row = cssRow ? Number(cssRow) : findStop(offsetTop!, model.rowStops);

	return {
		inGrid,
		column,
		row,
		ambiguous: {column: cssColumn === undefined || column === null, row: cssRow === undefined || row === null},
	};

}

export function calculateGridModel(gridElement: HTMLElement): GridModel {
	const style = getComputedStyle(gridElement);
	const gridStyle = getComputedStyle(gridElement);

	const rowGap = dePx(style.getPropertyValue("row-gap"));
	const columnGap = dePx(style.getPropertyValue("column-gap"));

	const columnWidths = getComputedStyle(gridElement).getPropertyValue("grid-template-columns")
		.split(" ")
		.map(px => dePx(px));
	const rowHeights = getComputedStyle(gridElement).getPropertyValue("grid-template-rows")
		.split(" ")
		.map(px => dePx(px));
	const columnStops = lengthsToStops(columnWidths, columnGap);
	const rowStops = lengthsToStops(rowHeights, rowGap);
	const rtl = gridStyle.getPropertyValue("direction") === "rtl";

	const cells = columnWidths.map(
		(cw: number, cIdx: number) => rowHeights.map(
			(rh: number, rIdx: number): GridCellModel => ({
				row: rIdx,
				column: cIdx,
				x: columnStops[cIdx],
				y: rowStops[rIdx],
				width: cw,
				height: rh,
				elements: [],
			})
		)
	);

	const rect = gridElement.getBoundingClientRect();

	const clientOrigin = {
		x: rect.x + dePx(gridStyle.getPropertyValue("padding-left")),
		y: rect.y + dePx(gridStyle.getPropertyValue("padding-top"))
	};

	const modelWithoutChildren: Omit<GridModel, "children"> = {
		rowStops,
		columnStops,
		cells,
		cellsSequential: cells.flat(1),
		clientOrigin,
		rtl,
	};

	const children: GridCellChild[] = Array.from(gridElement.children)
		.filter(el => el instanceof HTMLElement)
		.map(child => {
			return {
				element: child,
				...getGridPosition(child, modelWithoutChildren, gridStyle),
			};
		});

	for (const child of children) {
		if (child.row === null || child.column === null) continue;
		if (!cells[child.column][child.row]) continue;
		cells[child.column][child.row].elements.push(child.element);
	}

	return {
		...modelWithoutChildren,
		children,
		clientOrigin,
	};
}

export function getGridCell(gridModel: GridModel, clientX: number, clientY: number): GridCellModel {
	const offsetX = clientX - gridModel.clientOrigin.x;
	const offsetY = clientY - gridModel.clientOrigin.y;

	let column;
	if (gridModel.rtl) {
		const last = gridModel.columnStops.findLastIndex(stop => stop < offsetX);
		column = Math.max(0, Math.min(gridModel.columnStops.length - 2, gridModel.columnStops.length - 2 - last));
	} else {
		column = gridModel.columnStops.findIndex(stop => stop > offsetX) - 1;
	}

	let rowAfter = gridModel.rowStops.findIndex(stop => stop > offsetY);
	if (rowAfter < 1) rowAfter = 1;
	return gridModel.cells[column][rowAfter - 1];
}