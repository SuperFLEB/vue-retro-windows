
import type {MenuItemSpec} from "@/components/Menu/types.ts";
import type {WinUid} from "@t/WinMan.ts";
import {onUnmounted, provide, ref, watch} from "vue";
import useTheme, {canUseTheme} from "@/providers/ThemeProvider/useTheme.ts";
import k from "./keys.ts";
import type {AppManagerProvides} from "@/providers/AppManagerProvider/AppManagerProvider.vue";
import type {PartialWindowInstanceWithUid, WindowInstance} from "@t/WindowInstance.ts";

let lastWinIndex: number = 0;

type Registry = Map<WinUid, WindowInstance>;

/**
 * Rearrange windows' z-index to shift the targeted window to the front.
 * This will mutate the given WinManRegistry.
 * @param registry
 * @param uid
 * @returns void
 */
function unshiftZ(registry: Registry, uid: WinUid) {
	const keys = [...registry.keys()];
	const total = registry.size;
	keys.sort((a, b) => registry.get(a)!.z - registry.get(b)!.z);
	let gap = 0;
	keys.forEach((key, idx) => {
		registry.get(key)!.z = key === uid.toString() ? total - ++gap : idx - gap;
	});
	return;
};

export const defaultWindowInstance: Omit<WindowInstance, "uid" | "winId"> = {
	x: 0,
	y: 0,
	z: 0,
	width: 200,
	height: 200,
	focus: false,
	parent: null,
	title: "Untitled Window",
};

const defaultKeys = [...Object.keys(defaultWindowInstance), "menu", "proxyBox"];

function newWinUid(): WinUid {
	return `auto:${++lastWinIndex}`;
}

function createWindowInstance(
	props: Partial<WindowInstance> | null,
	uid?: WinUid | null,
	parent?: WinUid | null,
	defaults = defaultWindowInstance,
): WindowInstance {
	// TODO: Get rid of the title stuff I'm doing for debug
	const _uid = props?.uid ?? uid ?? newWinUid();
	return {
		...defaults,
		uid: _uid,
		parent: parent,
		...(props || {}),
	} as WindowInstance;
}

function clean(
	WindowInstance: PartialWindowInstanceWithUid,
	defaults: typeof defaultWindowInstance | Record<never, never> = defaultWindowInstance
) {
	const cleaned: PartialWindowInstanceWithUid = {...defaults, ...WindowInstance} as PartialWindowInstanceWithUid;
	for (const key in cleaned) {
		if (!(defaultKeys.includes(key))) {
			delete cleaned[key as keyof WindowInstance];
		}
	}
	return cleaned;
}

export default function provideWindowManager() {
	let appManager: AppManagerProvides | undefined = undefined;

	const registry = ref(new Map<WinUid, WindowInstance>());

	const iteration = ref(0);
	const iterations = ref(new Map<WinUid, number>());

	function connectAppManager(provides: AppManagerProvides) {
		appManager = provides;
	}

	function getWindowInstanceById(uid: WinUid, why: string = "getWindowInstanceById") {
		const instance = registry.value.get(uid);
		if (instance) return instance;
		console.warn(`${why}: Invalid Window ID`, {uid, winMan: {...registry.value}});
		return undefined;
	}

	const intf = Object.freeze({
		register(props: Partial<WindowInstance>): WindowInstance {
			const instance = createWindowInstance(props);
			if (instance.uid && registry.value.has(instance.uid)) {
				if (iterations.value.get(instance.uid) === iteration.value) {
					console.warn(`Attempt to register a uid twice (WinMan iteration ${iteration.value}). Returning the original.`, props.uid);
				} else {
					console.warn(`WinId registered twice but it was a different iteration.`, {
						was: iterations.value.get(instance.uid),
						now: iteration.value
					});
				}
				return this.get(instance.uid, true);
			}
			iterations.value.set(instance.uid, iteration.value);
			registry.value.set(instance.uid, instance);
			return this.get(instance.uid, true);
		},
		focus(uid: WinUid) {
			const win = registry.value.get(uid);
			if (!win) return;
			registry.value.forEach(w => {
				return w.focus = (w.uid === uid);
			});
			unshiftZ(registry.value, uid);
		},
		blur(uid: WinUid) {
			const win = registry.value.get(uid);
			if (!win) return;
		},
		get: (function (uid: WinUid, throwOnNotFound: boolean = false) {
			const instance = getWindowInstanceById(uid, "Get Window");
			if (instance === undefined && throwOnNotFound) throw new Error("Failed to retrieve instance");
			return instance;
		}) as {
			(uid: WinUid, throwOnNotFound: true): WindowInstance;
			(uid: WinUid, throwOnNotFound?: false): WindowInstance | undefined;
		},
		has(uid: WinUid): boolean {
			return registry.value.has(uid);
		},
		setMenu(uid: WinUid, menu: MenuItemSpec) {
			registry.value.get(uid)!.menu = menu;
		},
		update(props: PartialWindowInstanceWithUid) {
			const win = this.get(props.uid);
			if (!win) return;
			Object.assign(win, clean(props, {}));
		},
	});

	const themeRef = canUseTheme() ? useTheme().themeRef : null;
	if (themeRef) {
		watch(themeRef, () => {
			iteration.value++;
		});
	}

	provide(k.INTERFACE_WM, intf);
	provide(k.REGISTRY_WM, registry);

	onUnmounted(() => {
		appManager = undefined;
	})

	return {registry, interface: intf, connectAppManager};
}