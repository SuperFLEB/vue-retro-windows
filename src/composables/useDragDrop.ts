import type Movement from "@t/Movement.ts";
import type XY from "@t/XY.ts";
import useWindowMouse, {HandlerReason} from "@/composables/useWindowMouse.ts";
import {onUnmounted, type Ref, ref} from "vue";

const getNewDragState = (e: MouseEvent, dragState: Movement): Movement => {
	const delta = {
		x: e.clientX - dragState.cx,
		y: e.clientY - dragState.cy,
	};
	return {
		...dragState,
		x: dragState.x + delta.x,
		y: dragState.y + delta.y,
		cx: e.clientX,
		cy: e.clientY,
		dx: delta.x,
		dy: delta.y,
	};
};

type DragDropHandler = (e: MouseEvent, dragState: Movement, initialDragState: XY) => void;
type DragEndHandler = (e: MouseEvent | null, dragState: Movement, initialDragState: XY) => void;

type UseDragDropProps = {
	// Handler for when the drag starts, on mousedown.
	onStart?: DragDropHandler | null;
	// Handler for when the mouse button is down and the mouse moves, mid-drag.
	onMove?: DragDropHandler | null;
	// Handler for when the drag ends, either due to mouseup or the component unmounting. Event may be null in the case of an unmount.
	onEnd?: DragEndHandler | null;
	// Handler for when the drag ends due to mouseup. Not run when the component unmounts.
	onMouseUp?: DragDropHandler | null;
};

type UseDragDropReturn = {
	onMouseDownFactory: (xy: XY) => (e: MouseEvent) => void;
	dragStateRef: Ref<Movement | null>;
	initialDragStateRef: Ref<XY | null>;
};

export default function useDragDrop({
										onStart = null,
										onMove = null,
										onEnd = null,
										onMouseUp = null,
									}: UseDragDropProps = {}): UseDragDropReturn {

	const initialDragState = ref<XY | null>(null);
	const dragState = ref<Movement | null>(null);

	const handleDragStart = (e: MouseEvent, xy: XY) => {
		const newDragState: Movement = {
			x: xy.x,
			y: xy.y,
			sx: e.clientX,
			sy: e.clientY,
			dx: 0,
			dy: 0,
			cx: e.clientX,
			cy: e.clientY,
		};
		dragState.value = newDragState;
		initialDragState.value = {...xy};
		onStart?.(e, newDragState, newDragState);
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (dragState.value === null) return;
		if (initialDragState.value === null) return;
		const newDragState = getNewDragState(e, dragState.value);
		dragState.value = newDragState;
		onMove?.(e, newDragState, initialDragState.value);
	};

	const handleDragEnd = (e: MouseEvent | null, reason: HandlerReason) => {
		if (dragState.value === null) return;
		if (initialDragState.value === null) return;
		const endDragState = dragState.value;
		dragState.value = null;

		if (reason === HandlerReason.MOUSEUP) {
			onMouseUp?.(e as MouseEvent, endDragState, initialDragState.value);
		}

		onEnd?.(e, endDragState, initialDragState.value);
	};

	const {mouseDownHandler: onMouseDown} = useWindowMouse({
		dragMoveHandler: handleMouseMove,
		dragEndHandler: handleDragEnd,
	});

	const onMouseDownFactory = (xy: XY) => (e: MouseEvent) => {
		if (!onMouseDown) return;
		onMouseDown(e);
		handleDragStart(e, xy);
	};

	onUnmounted(() => {
		dragState.value = null;
		initialDragState.value = null;
	});

	return {onMouseDownFactory, dragStateRef: dragState, initialDragStateRef: initialDragState};
}
