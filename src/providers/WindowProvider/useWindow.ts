import {inject} from "vue";
import {Win as w} from "@/providers/WindowProvider/keys.ts";
import type {WindowInterface} from "@/providers/WindowProvider/WindowProvider.vue";
import {ComposableOutOfContextError} from "@/errors.ts";
import type {WindowInstance} from "@t/RwEnvironment.ts";

export const useWindow = () => {
	const intf = inject<WindowInterface>(w.INTERFACE);
	const instance = inject<WindowInstance>(w.INSTANCE);
	if (!(intf && instance)) {
		throw new ComposableOutOfContextError("WinInterface not found. Components using useWindow must be placed within a WindowProvider.");
	}

	return {instance, interface: intf};
};
