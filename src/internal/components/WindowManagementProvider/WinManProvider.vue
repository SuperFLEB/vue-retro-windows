<script setup lang="ts">
import type {ValidPartialWindowProps, WindowProps, WinId} from "@t/WinMan.ts";
import {clean, createWindowProps} from "@int/components/Window/props.ts";
import {debug, debugWarn, nondebugWarn} from "@int/debug/index.ts";
import {type DeepReadonly, provide, reactive, readonly, ref, watch} from "vue";
import {WinMan as wm} from "@int/components/WindowManagementProvider/keys.ts";
import {unshiftZ} from "@int/components/WindowManagementProvider/util.ts";
import useTheme, {canUseTheme} from "@int/components/ThemeProvider/useTheme.ts";
import type {MenuItemSpec} from "@int/components/Menu/types.ts";

type WinManRegistry = Record<WinId, WindowProps>;

const _winMan: WinManRegistry = reactive({});
const iteration = ref(0);
const iterations = ref<Record<WinId, number>>({});

const hasWinId = (winId: WinId) => (winId in _winMan);

const checkWinId = (winId: WinId, why: string): boolean => {
	if (hasWinId(winId)) return true;
	debugWarn(`${why}: Invalid Window ID`, {winId, winMan: {..._winMan}});
	nondebugWarn(`${why} Invalid Window ID:`, winId);
	return false;
};

const focus = (winId: WinId) => {
	if (!checkWinId(winId, "Focus")) return;
	Object.values(_winMan).forEach(w => w.focus = w.winId === winId);
	unshiftZ(_winMan, winId);
};

const blur = (winId: WinId) => {
	if (!checkWinId(winId, "Blur")) return;
	// _winMan[winId].focus = false;
};

const get = (winId: WinId): WindowProps => {
	if (!checkWinId(winId, "Get Window")) throw new Error("Invalid Window ID");
	return reactive(_winMan[winId]);
}

const has = (winId: WinId): boolean => {
	return hasWinId(winId);
}

const setMenu = (winId: WinId, menu: MenuItemSpec) => {
	_winMan[winId].menu = menu;
}

const register = (props: Partial<WindowProps>) => {
	const windowProps = createWindowProps(props);
	if (windowProps.winId && windowProps.winId in _winMan) {
		if (iterations.value[windowProps.winId] === iteration.value) {
			console.warn(`Attempt to register a winId twice (WinMan iteration ${iteration.value}). Returning the original.`, props.winId);
		} else {
			debug.warn(`WinId registered twice but it was a different iteration.`, { was: iterations.value[windowProps.winId], now: iteration.value });
		}
		return get(windowProps.winId);
	}
	iterations.value[windowProps.winId] = iteration.value;
	_winMan[windowProps.winId] = windowProps;
	return get(windowProps.winId);
}

const update = (props: ValidPartialWindowProps) => {
	if (!checkWinId(props.winId, "Update")) return;
	Object.assign(_winMan[props.winId],  {..._winMan[props.winId], ...clean(props, {})});
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

const winMan = readonly(_winMan);
provide<DeepReadonly<WinManRegistry>>(wm.REGISTRY, winMan);
</script>

<template><slot /></template>
