<script setup lang="ts">
import type {ValidPartialWindowProps, WindowProps, WinId} from "@t/WinMan.ts";
import {clean, createWindowProps} from "@/components/Window/props.ts";
import {debug, debugWarn, nondebugWarn} from "@/debug/index.ts";
import {type DeepReadonly, provide, reactive, readonly, ref, watch} from "vue";
import {WinMan as wm} from "@/providers/WinManProvider/keys.ts";
import {unshiftZ} from "@/providers/WinManProvider/util.ts";
import useTheme, {canUseTheme} from "@/providers/ThemeProvider/useTheme.ts";
import type {MenuItemSpec} from "@/components/Menu/types.ts";
// import Storage from "@/util/Storage.js";

type WinManRegistry = Record<WinId, WindowProps>;

type Props = { appId: string };
const props = defineProps<Props>();

const _winMan = ref<WinManRegistry>({});
const iteration = ref(0);
const iterations = ref<Record<WinId, number>>({});

const hasWinId = (winId: WinId) => (winId in _winMan.value);

const checkWinId = (winId: WinId, why: string): boolean => {
	if (hasWinId(winId)) return true;
	debugWarn(`${why}: Invalid Window ID`, {winId, winMan: {..._winMan.value}});
	nondebugWarn(`${why} Invalid Window ID:`, winId);
	return false;
};

const focus = (winId: WinId) => {
	if (!checkWinId(winId, "Focus")) return;
	Object.values(_winMan.value).forEach(w => w.focus = w.winId === winId);
	unshiftZ(_winMan.value, winId);
};

const blur = (winId: WinId) => {
	if (!checkWinId(winId, "Blur")) return;
	// _winMan.value[winId].focus = false;
};

const get = (winId: WinId): WindowProps => {
	if (!checkWinId(winId, "Get Window")) throw new Error("Invalid Window ID");
	return reactive(_winMan.value[winId]);
}

const has = (winId: WinId): boolean => {
	return hasWinId(winId);
}

const setMenu = (winId: WinId, menu: MenuItemSpec) => {
	_winMan.value[winId].menu = menu;
}

const register = (props: Partial<WindowProps>) => {
	const windowProps = createWindowProps(props);
	if (windowProps.winId && windowProps.winId in _winMan.value) {
		if (iterations.value[windowProps.winId] === iteration.value) {
			console.warn(`Attempt to register a winId twice (WinMan iteration ${iteration.value}). Returning the original.`, props.winId);
		} else {
			debug.warn(`WinId registered twice but it was a different iteration.`, { was: iterations.value[windowProps.winId], now: iteration.value });
		}
		return get(windowProps.winId);
	}
	iterations.value[windowProps.winId] = iteration.value;
	_winMan.value[windowProps.winId] = windowProps;
	return get(windowProps.winId);
}

const update = (props: ValidPartialWindowProps) => {
	if (!checkWinId(props.winId, "Update")) return;
	Object.assign(_winMan.value[props.winId],  {..._winMan.value[props.winId], ...clean(props, {})});
}

const intf = Object.freeze({ has, get, register, focus, blur, update, setMenu });
export type WinManInterface = typeof intf;

const themeRef = canUseTheme() ? useTheme().themeRef : null;
if (themeRef) {
	watch(themeRef, () => {
		iteration.value++;
	});
}

provide<WinManInterface>(wm.INTERFACE, intf);
const winMan = readonly(_winMan.value);
provide<DeepReadonly<WinManRegistry>>(wm.REGISTRY, winMan);
</script>

<template><slot /></template>
