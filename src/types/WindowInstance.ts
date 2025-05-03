import type Box from "@t/Box.ts";
import type {WinId, WinUid} from "@t/WinMan.ts";
import type {MenuItemSpec} from "@/components/Menu/types.ts";

export type WindowInstance = Box & {
	uid: WinUid;
	winId: WinId;
	parent: WinUid | null;
	z: number;
	title: string;
	focus: boolean;
	menu?: MenuItemSpec;
	proxyBox?: Box;
};

// These properties can be changed from outside during the course of the window's life and should update the stored values.
// Other properties should always prefer stored values.
export const mutableWindowProps = [
	"menu",
	"title",
] as const;

export type PartialWindowInstanceWithUid = Partial<WindowInstance> & { uid: WinUid };
export type PartialWindowInstanceWithWinId = Partial<WindowInstance> & { winId: WinId };