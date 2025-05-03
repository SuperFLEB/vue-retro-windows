<script setup lang="ts">
import {provide} from "vue";
import {boxOf, xyOf} from "@/util.ts";
import {moveBoxCorner} from "@/util/Box.ts";
import useWindowManager from "@/providers/AppManagerProvider/useWindowManager.ts";
import {Win as w} from "./keys.ts";
import type {WinUid} from "@t/WinMan.ts";
import type XY from "@t/XY.ts";
import type CardinalCorner from "@t/CardinalCorner.ts";
import type Box from "@t/Box.ts";
import type {WindowInstance} from "@t/WindowInstance.ts";

type Props = { uid: WinUid };
const {uid} = defineProps<Props>();

const {interface: windowManagerInterface } = useWindowManager();

function get(uid: WinUid): WindowInstance {
	const window = windowManagerInterface.get(uid);
	if (window === undefined) throw new Error(`Window ${uid} not found`);
	return window;
}

function _getProxyBox(): Box {
	const win = get(uid);
	if (!win) throw new Error(`Window ${uid} not found`);
	return {
		...boxOf(win as Box),
		...boxOf(win.proxyBox ?? {}, true)
	} as Box;
}

function _updateProxyBox(updates: Partial<Box>): void {
	const current = _getProxyBox();
	windowManagerInterface.update({
		uid,
		proxyBox: {
			...current,
			...boxOf(updates)
		},
	});
}

const intf = Object.freeze({
	moveTo(xy: XY) {
		windowManagerInterface.update({uid, ...xyOf(xy)});
	},

	moveCorner(corner: CardinalCorner, xy: XY) {
		const current = get(uid);
		// TODO: Support minimum window size
		windowManagerInterface.update({uid, ...moveBoxCorner(current, xy, corner)});
	},

	proxyMoveTo(xy: XY) {
		_updateProxyBox({..._getProxyBox(), ...xy});
	},

	proxyMoveCorner(corner: CardinalCorner, xy: XY) {
		// TODO: Support minimum window size
		_updateProxyBox(moveBoxCorner(_getProxyBox(), xy, corner, { x: 200, y: 200 }));
	},

	proxyDrop() {
		const current = get(uid);
		if (!current) throw new Error(`Window ${uid} not found`);
		windowManagerInterface.update({
			uid,
			proxyBox: undefined,
			// Apply the box from proxyBox to the main object:
			...current.proxyBox,
		});
	},

	focus() {
		windowManagerInterface.focus(uid);
	},

	blur() {
		windowManagerInterface.blur(uid);
	},
});
export type WindowInterface = typeof intf;
provide<WindowInterface>(w.INTERFACE, intf);
provide<WindowInstance>(w.INSTANCE, windowManagerInterface.get(uid, true));
</script>

<template>
	<slot/>
</template>
