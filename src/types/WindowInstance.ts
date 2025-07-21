import type Box from "@t/Box.ts";
import type {WinId, WinUid} from "@t/WinMan.ts";
import type {MenuItemSpec} from "@/components/Menu/types.ts";

export type WindowState = "HIDDEN" | "MINIMIZED" | "NORMAL" | "MAXIMIZED";

export type WindowInstance = Box & {
	uid: WinUid;
	winId: WinId;
	parentUid: WinUid | null;
	children: Set<WinUid>;
	childrenByState: Record<WindowState, Set<WinUid>>;
	z: number;
	title: string;
	focus: boolean;
	initFocused?: boolean;
	state?: WindowState;
	menu?: MenuItemSpec;
	proxyBox?: Box;
};

// These properties can be changed from props changes during the course of the window's life and props changes should
// update the stored values. Other properties should always prefer live values.
export const mutableWindowProps = [
	"menu",
	"title",
] as const;

export type PartialWindowInstanceWithUid = Partial<WindowInstance> & { uid: WinUid };
export type PartialWindowInstanceWithWinId = Partial<WindowInstance> & { winId: WinId };