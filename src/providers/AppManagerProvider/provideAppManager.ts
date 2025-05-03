import type {ApplicationId} from "@t/Application.js";
import useApplicationCollection from "@/providers/ApplicationCollectionProvider/useApplicationCollection.js";
import {onUnmounted, provide, readonly, ref} from "vue";
import k from "./keys.ts";
import type {WinId, WinUid} from "@t/WinMan.ts";
import type {WindowManagerProvides} from "@/providers/AppManagerProvider/AppManagerProvider.vue";
import type {WindowInstance} from "@t/WindowInstance.ts";
import type {AppInstance, Pid} from "@t/AppInstance.ts";

let lastPid: Pid = 0;

export default function provideAppManager() {
	let associatedWindowManager: WindowManagerProvides | undefined = undefined;

	const registry = ref(new Map<Pid, AppInstance>());
	const {interface: appCollectionInterface} = useApplicationCollection();

	function connectWindowManager(provides: WindowManagerProvides) {
		associatedWindowManager = provides;
	}

	function windowManager(): WindowManagerProvides {
		if (!associatedWindowManager) throw new Error("Window Manager not found on App Manager. Cross-connect failed or the App Manager is being used after unmount.");
		return associatedWindowManager;
	}

	function launchWithPid(appId: ApplicationId, pid: Pid, parent?: Pid) {
		const appDefinition = appCollectionInterface.getApplicationDefinition(appId);
		if (!appDefinition) throw new Error(`Application ${appId} not registered`);
		registry.value.set(pid, {
			pid,
			appId,
			parent: parent ?? null,
			children: new Set(),
			windows: new Map<WinId, WinUid>(),
			terminated: false,
			recyclable: true,
		});
	}

	function getInstanceByPid(pid: Pid, throwOnNotFound?: false): AppInstance | undefined;
	function getInstanceByPid(pid: Pid, throwOnNotFound: true): AppInstance;
	function getInstanceByPid(pid: Pid, throwOnNotFound: boolean = false): AppInstance | undefined {
		const instance = registry.value.get(pid);
		if (instance === undefined && throwOnNotFound) throw new Error("PID S{pid} not found");
		return instance;
	}


	const intf = {
		get(pid: Pid) {
			return getInstanceByPid(pid, true);
		},
		launchRootApp(appId: ApplicationId): Pid {
			if (registry.value.has(0)) throw new Error("Root application already launched");
			launchWithPid(appId, 0, 0);
			return 0;
		},
		launch(appId: ApplicationId, parent: Pid): Pid {
			const pid = ++lastPid;
			launchWithPid(appId, pid, parent);
			return pid;
		},
		terminate(pid: Pid) {
			const instance = getInstanceByPid(pid, true);
			instance.terminated = true;
		},
		destroy(pid: Pid) {
			const instance = getInstanceByPid(pid, true);
			if (!instance.terminated) throw new Error("PID S{pid} cannot be destroyed before being terminated");
			registry.value.delete(pid);
		},
		registerWindow(pid: Pid, winId: WinId, uid: WinUid) {
			const appInstance = getInstanceByPid(pid, true);
			appInstance.windows.set(winId, uid);
		},
		getWindowUid(pid: Pid, winId: WinId): WinUid | undefined {
			const appInstance = getInstanceByPid(pid, true);
			const winManIntf = windowManager().interface;
			const winUid = appInstance.windows.get(winId);
			if (winUid === undefined || !winManIntf.has(winUid)) return undefined;
			return winUid;
		}
	};

	provide(k.INTERFACE_AM, intf);
	provide(k.REGISTRY_AM, readonly(registry));

	onUnmounted(() => {
		associatedWindowManager = undefined;
	})

	return {registry, interface: intf, connectWinManager: connectWindowManager};
}