import type {ApplicationId} from "@t/Application.ts";
import type {WinId, WinUid} from "@t/WinMan.ts";

export type Pid = number;
export type AppInstance = {
	pid: Pid,
	parent: Pid | null;
	appId: ApplicationId;
	children: Set<Pid>;
	windows: Map<WinId, WinUid>;
	terminated: boolean;
	recyclable: boolean;
};