<script setup lang="ts">
import {inject, provide, type Ref} from "vue";
import {Win as w, WinMan as wm} from "./keys.ts";
import {moveBoxCorner} from "@/components/WindowManagementProvider/util.ts";
import type XY from "@t/XY";
import type CardinalCorner from "@t/CardinalCorner.ts";
import type {WindowProps, WinId, WinManRegistry} from "@t/WinMan.ts";
import type {WinManInterface} from "@/components/WindowManagementProvider/WinManProvider.vue";
import {xyOf, boxOf, filterObject} from "@/util.ts";
import type Box from "@t/Box.ts";
import {ComposableOutOfContextError} from "@/errors.ts";

type Props = { winId: WinId };
const {winId} = defineProps<Props>();

const wmIntf = inject<WinManInterface>(wm.INTERFACE);

if (!wmIntf) {
	throw new ComposableOutOfContextError("WinMan interface not found. WindowProvider must be placed within a WinManProvider.");
}

const _getProxyBox = (): Box => {
	const win = wmIntf.get(winId);
	return {
		...boxOf(win),
		...boxOf(win.proxyBox ?? {}, true)
	} as Box;
};

const _updateProxyBox = (updates: Partial<Box>) => {
	const current = _getProxyBox();
	wmIntf.update({
		winId,
		proxyBox: {
			...current,
			...boxOf(updates)
		},
	});
};

const moveTo = (xy: XY) => {
	wmIntf.update({winId, ...xyOf(xy)});
};

const moveCorner = (corner: CardinalCorner, xy: XY) => {
	const current = wmIntf.get(winId);
	// TODO: Support minimum window size
	wmIntf.update({winId, ...moveBoxCorner(current, xy, corner)});
};

const proxyMoveTo = (xy: XY) => {
	_updateProxyBox({..._getProxyBox(), ...xy});
};

const proxyMoveCorner = (corner: CardinalCorner, xy: XY) => {
	// TODO: Support minimum window size
	_updateProxyBox(moveBoxCorner(_getProxyBox(), xy, corner));
};

const proxyDrop = () => {
	const current = wmIntf.get(winId);
	wmIntf.update({
		winId,
		proxyBox: null,
		// Apply the box from proxyBox to the main object:
		...current.proxyBox,
	});
};

const focus = () => {
	wmIntf.focus(winId);
};

const blur = () => {
	wmIntf.blur(winId);
};

const intf = Object.freeze({moveTo, moveCorner, proxyMoveTo, proxyMoveCorner, proxyDrop, focus, blur});

export type WinInterface = typeof intf;

provide<WinInterface>(w.INTERFACE, intf);
provide<WindowProps>(w.PROPS_REF, wmIntf.get(winId));

</script>

<template>
	<slot/>
</template>
