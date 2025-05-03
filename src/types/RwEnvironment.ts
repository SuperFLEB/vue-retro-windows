import type {WindowInstance} from "@t/WindowInstance.ts";
import type {AppInstance, Pid} from "@t/AppInstance.ts";

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

export type {RwEnvironment as default};