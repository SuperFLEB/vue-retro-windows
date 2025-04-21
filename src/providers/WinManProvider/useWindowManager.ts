import {inject} from "vue";
import {Win as w, WinMan as wm} from "@/providers/WinManProvider/keys.ts";
import type {WinInterface} from "@/providers/WinManProvider/WindowProvider.vue";
import type {WindowProps} from "@t/WinMan.ts";
import {ComposableOutOfContextError} from "@/errors.ts";
import type {WinManInterface} from "@/providers/WinManProvider/WinManProvider.vue";

export const useWindow = () => {
	const intf = inject<WinInterface>(w.INTERFACE);
	const props = inject<WindowProps>(w.PROPS_REF);
	if (!(intf && props)) {
		throw new ComposableOutOfContextError("WinInterface not found. Components using useWindow must be placed within a WindowProvider.");
	}

	return {props, interface: intf};
};

export const useWindowManager = () => {
	const intf = inject<WinManInterface>(wm.INTERFACE);
	return {interface: intf};
};

