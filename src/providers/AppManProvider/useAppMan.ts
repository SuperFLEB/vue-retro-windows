import {inject, type Ref} from "vue";
import {ComposableOutOfContextError} from "@/errors.ts";
import type {AppManProviderInterface, Instances} from "@/providers/AppManProvider/AppManProvider.vue";
import k from "./keys.js";

export const canUseAppMan = () => inject(k.INTERFACE) !== undefined;
export default function useAppMan() {
	const intf = inject<AppManProviderInterface>(k.INTERFACE);
	const instances = inject<Readonly<Ref<Instances>>>(k.INSTANCES);
	if (!intf || !instances) {
		throw new ComposableOutOfContextError("AppManProvider not found. Components using useAppMan must be placed within a AppManProvider.");
	}
	return {interface: intf, instances };
};

