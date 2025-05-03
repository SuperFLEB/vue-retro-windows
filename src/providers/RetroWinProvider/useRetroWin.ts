import {inject, type Ref} from "vue";
import {ComposableOutOfContextError} from "@/errors.ts";
import type {AppManProviderInterface, Instances} from "@/providers/RetroWinProvider/RetroWinProvider.vue";
import k from "./keys.js";

export const canUseAppMan = () => inject(k.INTERFACE) !== undefined;
export default function useRetroWin() {
	const intf = inject<AppManProviderInterface>(k.INTERFACE);
	const instances = inject<Readonly<Ref<Instances>>>(k.INSTANCES);
	if (!intf || !instances) {
		throw new ComposableOutOfContextError("RetroWinProvider not found. Components using useRetroWin must be placed within a RetroWinProvider.");
	}
	return {interface: intf, instances };
};

