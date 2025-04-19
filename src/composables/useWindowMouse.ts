import {onUnmounted, ref} from "vue";

export const enum HandlerReason {
	MOUSEDOWN = "mousedown",
	MOVE = "mousemove",
	MOUSEUP = "mouseup",
	UNMOUNT = "unmount",
};

export type MouseEventHandler = ((e: MouseEvent, reason: Exclude<HandlerReason, HandlerReason.UNMOUNT>) => void);
export type DragEndHandler = {
	(e: null, reason: HandlerReason.UNMOUNT): void;
	(e: MouseEvent, reason: HandlerReason.MOUSEUP): void;
}
export type Handler = ((e: MouseEvent | null, reason: HandlerReason) => void);

type UseWindowMouseHandlers = {
	// Handler to run when the mouse button goes down.
	dragStartHandler?: MouseEventHandler;

	// Handler to run when the mouse moves during a drag.
	dragMoveHandler?: MouseEventHandler;

	// Handler to run when the mouse button is released or when the component unmounts. This happens any time move events will no longer be handled.
	dragEndHandler?: DragEndHandler;

	// Handler to run when the mouse button is released. Does not trigger when the drag ends because the component is unmounted.
	mouseUpHandler?: MouseEventHandler;
};

type UseWindowMouseResponse = {
	mouseDownHandler: (e: MouseEvent) => void;
}

export type UseWindowMouse = (handlers: UseWindowMouseHandlers) => UseWindowMouseResponse;

/**
 * Creates handlers that get mouseUp and mouseMove events from the window, so situations where mouseUp happens outside
 * the component DOM are still handled.
 */
const useWindowMouse = ({
							dragStartHandler,
							dragMoveHandler,
							dragEndHandler,
							mouseUpHandler,
						}: UseWindowMouseHandlers) => {
	const isMouseDown = ref<boolean>(false);

	const handleMouseMove = (e: MouseEvent) => {
		if (!(isMouseDown.value && dragMoveHandler)) return;
		dragMoveHandler(e, HandlerReason.MOVE);
	};

	const handleMouseUp = (e: MouseEvent) => {
		mouseUpHandler?.(e, HandlerReason.MOUSEUP);
		dragEndHandler?.(e, HandlerReason.MOUSEUP);
	};

	onUnmounted(() => {
		window.removeEventListener("mousemove", handleMouseMove);
		window.removeEventListener("mouseup", handleMouseUp);
		isMouseDown.value = false;
		if (isMouseDown.value) dragEndHandler?.(null, HandlerReason.UNMOUNT);
	});

	const mouseDownHandler = (e: MouseEvent) => {
		isMouseDown.value = true;
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
		dragStartHandler?.(e, HandlerReason.MOUSEDOWN);
	};

	return {mouseDownHandler} as const;
};

export default useWindowMouse;
