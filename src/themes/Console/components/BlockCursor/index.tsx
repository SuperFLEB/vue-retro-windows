import { useEffect, useRef, useState } from "react";
import style from "./style.module.css";
import Classes from "@/util/Classes.ts";
import { XY } from "@/util/metricsTypes.ts";

export type BlockCursorType = "block" | "invert";
export type GridSize = { x: number; y: number };

const onCursorMove = (e: MouseEvent, parent: Element, setPosition: (xy: XY) => void, gridSize: XY) => {
	const parentRect = parent.getBoundingClientRect();

	const realPos = {
		x: e.clientX - parentRect.left,
		y: e.clientY - parentRect.top,
	};

	const gridPosition = {
		x: Math.floor(realPos.x / gridSize.x) * gridSize.x,
		y: Math.floor(realPos.y / gridSize.y) * gridSize.y,
	};

	setPosition(gridPosition);
};

type BlockCursorProps = { gridSize: GridSize; cursor?: string; type?: BlockCursorType; colors?: [string, string] };
const BlockCursor = ({ type = "invert", colors = ["#fff", "#000"], gridSize }: BlockCursorProps) => {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const ref = useRef(null);
	useEffect(() => {
		if (!ref.current) return;

		const element = ref.current as HTMLElement;
		const parent = element.offsetParent ?? document.body;

		const trackCursor = (e: MouseEvent) => {
			const bodyClasses = new Classes(document.body.className);
			document.body.className = bodyClasses.push(style.cursorHidden).all();
			onCursorMove(e, parent, setPosition, gridSize);
		};

		const showPointer = () => {
			const bodyClasses = new Classes(document.body.className);
			document.body.className = bodyClasses.remove(style.cursorHidden).all();
		};

		element.style.setProperty(`--grid-x`, `${gridSize.x}px`);
		element.style.setProperty(`--grid-y`, `${gridSize.y}px`);

		parent.addEventListener("mousemove", trackCursor as EventListener);

		return () => {
			parent.removeEventListener("mousemove", trackCursor as EventListener);
			showPointer();
		};
	}, [ref.current, setPosition, gridSize]);

	const styles = {
		left: position.x,
		top: position.y,
		...(type === "invert"
			? {}
			: {
					color: colors[0],
					backgroundColor: colors[1],
				}),
	};

	return (
		<div ref={ref} style={styles} className={[style.blockCursor, type === "invert" ? style.invert : ""].join(" ")}>
			{" "}
		</div>
	);
};

export default BlockCursor;
