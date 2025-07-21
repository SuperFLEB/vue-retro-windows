import type {MenuItemSpec} from "@/components/Menu/types.ts";
import type {WinUid} from "@t/WinMan.ts";
import {computed, onUnmounted, provide, ref, watch} from "vue";
import useTheme, {canUseTheme} from "@/providers/ThemeProvider/useTheme.ts";
import k from "./keys.ts";
import type {AppManagerProvides} from "@/providers/AppManagerProvider/AppManagerProvider.vue";
import type {PartialWindowInstanceWithUid, WindowInstance} from "@t/WindowInstance.ts";
import type XY from "@t/XY.ts";
import {boxOf, xyOf} from "@/util.ts";
import type Box from "@t/Box.ts";
import type CardinalCorner from "@t/CardinalCorner.ts";
import {moveBoxCorner} from "@/util/Box.ts";
import type {ChildrenByState} from "@t/ChildrenByState.ts";

let lastWinIndex: number = 0;

type Registry = Map<WinUid, WindowInstance>;

/**
 * Rearrange windows' z-index to shift the targeted window to the front. Returns a map of WinUids to new z values.
 */
function unshiftZ(registry: Registry, uid: WinUid) {
	const keys: WinUid[] = [...registry.keys()];
	const total = registry.size;
	keys.sort((a, b) => registry.get(a)!.z - registry.get(b)!.z);
	let gap = 0;
	return Object.fromEntries(keys.map((key, idx) => [key, key === uid.toString() ? total - ++gap : idx - gap]));
}

type DefaultWindowInstance = Omit<WindowInstance, "uid" | "winId">;

export const defaultWindowInstance = (): DefaultWindowInstance => ({
	x: 0,
	y: 0,
	z: 0,
	width: 200,
	height: 200,
	state: "NORMAL",
	focus: false,
	parentUid: null,
	children: new Set<WinUid>(),
	childrenByState: {
		HIDDEN: new Set(),
		MINIMIZED: new Set(),
		NORMAL: new Set(),
		MAXIMIZED: new Set(),
	},
	title: "Untitled Window",
});

const defaultKeys = [
	...Object.keys(defaultWindowInstance()),
	"menu",
	"proxyBox"
];

function newWinUid(): WinUid {
	return `auto:${++lastWinIndex}`;
}

function createWindowInstance(
	props: Partial<WindowInstance> | null,
	defaults = defaultWindowInstance(),
): WindowInstance {
	return {
		...defaults,
		...(props || {}),
		uid: props?.uid ?? newWinUid(),
		parentUid: props?.parentUid ?? null,
		children: props?.children ?? new Set(),
	} as WindowInstance;
}

function clean(WindowInstance: PartialWindowInstanceWithUid) {
	const cleaned: PartialWindowInstanceWithUid = {...WindowInstance} as PartialWindowInstanceWithUid;
	for (const key in cleaned) {
		if (!(defaultKeys.includes(key))) {
			delete cleaned[key as keyof WindowInstance];
		}
	}
	return cleaned;
}

export default function provideWindowManager() {
	// Not currently used, but leaving it in here in case it becomes necessary in the future
	/* @ts-expect-error no-unused-vars */ // eslint-disable-next-line @typescript-eslint/no-unused-vars
	let appManager: AppManagerProvides | undefined = undefined;

	const registry = ref(new Map<WinUid, WindowInstance>());

	const childrenByState = computed<ChildrenByState>(() => {
		const cbs: ChildrenByState = {
			HIDDEN: new Set(),
			MINIMIZED: new Set(),
			NORMAL: new Set(),
			MAXIMIZED: new Set(),
		};
		for (const w of registry.value.values()) {
			if (w.state && w.state in cbs && w.parentUid === null) cbs[w.state].add(w.uid);
		}
		return cbs;
	});

	// Whenever the theme changes, all windows re-register. The iteration number, incremented whenever the theme changes,
	// is used to determine whether the re-registration was as the result of a theme change (if the iteration differs from
	// the previous) or the result of a double-registration of the same WinUid (usually if not always an error)
	const themeIteration = ref(0);
	// This map has the latest known iteration number for each WinUid
	const themeIterations = ref(new Map<WinUid, number>());

	function connectAppManager(provides: AppManagerProvides) {
		appManager = provides;
	}

	function getWindowInstanceById(uid: WinUid, why: string = "getWindowInstanceById"): WindowInstance | undefined {
		const instance = registry.value.get(uid);
		if (instance) return instance;
		console.warn(`${why}: Invalid Window ID`, {uid, winMan: {...registry.value}});
		return undefined;
	}

	const intf = Object.freeze({
		register(windowInstanceProps: Partial<WindowInstance>, parentUid?: WinUid): WindowInstance {
			const instance = createWindowInstance({...windowInstanceProps, parentUid});

			if (registry.value.has(instance.uid)) {
				// Re-registration can occur on theme change, or in error. In both cases, the appropriate response is to
				// just re-use the existing instance metadata, but this logs which occurred.
				if (themeIterations.value.get(instance.uid) === themeIteration.value) {
					console.warn(`Attempt to register a uid twice (Theme iteration ${themeIteration.value}). Returning the original.`, windowInstanceProps.uid);
				} else {
					console.warn(`WinId registered twice but it was a different iteration.`, {
						was: themeIterations.value.get(instance.uid),
						now: themeIteration.value
					});
				}
				return this.get(instance.uid, true);
			}

			themeIterations.value.set(instance.uid, themeIteration.value);

			registry.value.set(instance.uid, instance);

			const parentInstance = this.get(parentUid ?? undefined);
			if (parentInstance) {
				this.childRegister(parentUid!, instance);
			}

			return this.get(instance.uid, true);
		},
		focus(uid: WinUid) {
			const win = registry.value.get(uid);
			if (!win) return;
			for (const [targetUid, z] of Object.entries(unshiftZ(registry.value, uid))) {
				const targetInstance = this.get(targetUid);
				if (!targetInstance) continue;
				this.update({uid: targetUid, z, focus: targetUid === uid});
			}
		},
		blur(uid: WinUid) {
			const win = registry.value.get(uid);
			if (!win) return;
			this.update({uid, focus: false});
		},
		minimize(uid: WinUid) {
			this.update({uid, state: "MINIMIZED"});
		},
		maximize(uid: WinUid) {
			this.update({uid, state: "MAXIMIZED"});
		},
		restore(uid: WinUid) {
			this.update({uid, state: "NORMAL"});
		},
		moveTo(uid: WinUid, xy: XY) {
			this.update({uid, ...xyOf(xy)});
		},
		moveCorner(uid: WinUid, corner: CardinalCorner, xy: XY) {
			const current = this.get(uid);
			if (!current) return;
			// TODO: Support minimum window size
			this.update({uid, ...moveBoxCorner(current, xy, corner)});
		},
		proxyMoveTo(uid: WinUid, xy: XY) {
			this.updateProxyBox(uid, {...this.getProxyBox(uid), ...xy});
		},
		proxyMoveCorner(uid: WinUid, corner: CardinalCorner, xy: XY) {
			// TODO: Support minimum window size
			this.updateProxyBox(uid, moveBoxCorner(this.getProxyBox(uid), xy, corner, {x: 200, y: 200}));
		},
		proxyDrop(uid: WinUid) {
			const current = this.get(uid);
			if (!current) throw new Error(`Window ${uid} not found`);
			this.update({
				uid,
				proxyBox: undefined,
				// Apply the box from proxyBox to the main object:
				...current.proxyBox,
			});
		},
		getProxyBox(uid: WinUid): Box {
			const winInstance = this.get(uid);
			if (!winInstance) return { x: 0, y: 0, width: 0, height: 0 };
			return {
				...boxOf(winInstance as Box),
				...boxOf(winInstance.proxyBox ?? {}, true)
			} as Box;
		},
		updateProxyBox(uid: WinUid, updates: Partial<Box>): void {
			const current = this.getProxyBox(uid);
			this.update({
				uid,
				proxyBox: {
					...current,
					...boxOf(updates)
				},
			});
		},
		get: (function (uid?: WinUid, throwOnNotFound: boolean = false): WindowInstance | undefined {
			const instance = typeof uid === "string" ? getWindowInstanceById(uid, "Get Window") : undefined;
			if (!instance && throwOnNotFound) throw new Error("Failed to retrieve instance");
			return instance;
		}) as {
			(uid: WinUid | undefined, throwOnNotFound: true): WindowInstance;
			(uid?: WinUid, throwOnNotFound?: false): WindowInstance | undefined;
		},
		has(uid: WinUid): boolean {
			return registry.value.has(uid);
		},
		setMenu(uid: WinUid, menu: MenuItemSpec) {
			this.update({uid, menu});
		},
		update(props: PartialWindowInstanceWithUid) {
			const windowInstance = this.get(props.uid);
			if (!windowInstance) return;

			const parentUid = windowInstance.parentUid;
			const parentInstance = this.get(parentUid ?? undefined);

			Object.assign(windowInstance, clean(props));

			if (parentInstance) {
				this.childUpdate(parentInstance.uid, props);
			}
		},
		childRegister(uid: string, childInstance: WindowInstance): void {
			const instance = this.get(uid);
			instance!.children.add(childInstance.uid);
			this.childUpdate(uid, childInstance);
		},
		childUpdate(uid: string, props: PartialWindowInstanceWithUid): void {
			const instance = this.get(uid);
			if (instance && props.state) {
				// Update the child state sets given the change in state
				for (const [state, set] of Object.entries(instance!.childrenByState)) {
					if (state === props.state) {
						set.add(props.uid);
					} else {
						set.delete(props.uid);
					}
				}
			}
		}
	});
	type WindowManagerInterface = typeof intf;
	type BoundWindowManagerInterface = {
		[k in keyof WindowManagerInterface]: UidBound<WindowManagerInterface[k]>;
	}

	const bindInterface = (uid: WinUid): BoundWindowManagerInterface => {
		intf.get(uid, true);
		const bound = {} as any;
		for (const k of (Object.keys(intf) as Array<keyof WindowManagerInterface>)) {
			bound[k] = (...etc: any[]) => (intf[k] as UidFunction)(uid, ...etc);
		}
		return Object.freeze(bound as BoundWindowManagerInterface);
	};

	const themeRef = canUseTheme() ? useTheme().themeRef : null;
	if (themeRef) {
		watch(themeRef, () => {
			themeIteration.value++;
		});
	}

	provide(k.INTERFACE_WM, intf);
	provide(k.BIND_INTERFACE_WM, bindInterface);
	provide(k.REGISTRY_WM, registry);
	provide(k.CHILDREN_BY_STATE_WM, childrenByState);

	onUnmounted(() => {
		appManager = undefined;
	});

	return {registry, interface: intf, connectAppManager, bindInterface: bindInterface};
}

type UidFunction = (uid: WinUid, ...etc: any[]) => any;
type UidBound<F> = F extends (uid: WinUid, ...etc: infer A) => infer R ? (...etc: A) => R : F;

