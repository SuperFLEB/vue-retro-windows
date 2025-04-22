import {inject} from "vue";
import {Win as w} from "@/providers/WinManProvider/keys.ts";
import type {WinInterface} from "@/providers/WinManProvider/WindowProvider.vue";
import type {WindowProps} from "@t/WinMan.ts";
import {ComposableOutOfContextError} from "@/errors.ts";

export const useWindow = () => {
	const intf = inject<WinInterface>(w.INTERFACE);
	const props = inject<WindowProps>(w.PROPS_REF);
	if (!(intf && props)) {
		throw new ComposableOutOfContextError("WinInterface not found. Components using useWindow must be placed within a WindowProvider.");
	}

	return {props, interface: intf};
};
