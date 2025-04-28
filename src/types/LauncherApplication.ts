import type {ThemeInfo} from "@t/Theme.js";
import type {Component} from "vue";
import type XY from "@t/XY.js";

type Parent = {/* TBD */};
export type DeriverCallback<T, EXTRA extends Record<string | symbol, any> | undefined = undefined> = (attachment: string | undefined, parent: Parent | undefined, theme: ThemeInfo, launcher: LauncherApplicationInstance, extra?: EXTRA) => T;

export type LaunchState = "CLOSED" | "HIDDEN" | "MINIMIZED" | "NORMAL" | "MAXIMIZED";

export type LauncherApplicationSpec = {
	id: string,
	keyName: string,

	multiInstance: boolean,
	attachable: boolean,

	displayName: string | DeriverCallback<string>,
	icon: Component<{ attachment?: string, launcher: LauncherApplicationInstance, size?: XY }>,
	component: Component<{ attachment?: string }>,
};

export type LauncherApplicationInstance = LauncherApplicationSpec & {
	attachment?: string;
	state: LaunchState;
}