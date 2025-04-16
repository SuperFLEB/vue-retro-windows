export type Movement = {
	// Starting x, y
	sx: number;
	sy: number;

	// x, y calibrated to sx, sy
	x: number;
	y: number;

	// Delta/distance dx, dy
	dx: number;
	dy: number;

	// Client (window, absolute) x, y
	cx: number;
	cy: number;
};

export type TargetMovement = Movement & { target: HTMLElement };

export type {Movement as default};
