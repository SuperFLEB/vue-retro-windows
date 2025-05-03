import type Box from "@t/Box.ts";
import type {WinId, WinUid} from "@t/WinMan.js";
import type {ApplicationId} from "@t/Application.js";
import type {MenuItemSpec} from "@/components/Menu/types.ts";

export type Pid = number;

/* export default */
export type RwEnvironment = {
	// Not all themes may be present. Only themes that have been customized are here.
	themes?: Record<string, {
		keyName: string;
		colors?: Record<string, string>;
		background?: {
			image?: Uint8ClampedArray;
			imageType?: string;
			imageUrl?: string;
		},
	}>,
	theme: string,
	apps: Record<Pid, AppInstance>,
	windows: Record<Pid, WindowInstance>,
};

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

export type PartialWindowInstanceWithUid = Partial<WindowInstance> & { uid: WinUid };
export type PartialWindowInstanceWithWinId = Partial<WindowInstance> & { winId: WinId };

export type AppInstance = {
	pid: Pid,
	parent: Pid | null;
	appId: ApplicationId;
	children: Set<Pid>;
	windows: Map<WinId, WinUid>;
	terminated: boolean;
	recyclable: boolean;
};

export type {RwEnvironment as default};