import {inject} from "vue";
import k from "./keys.ts";
import {ComposableOutOfContextError} from "@/errors.js";
import type {
	AppManagerInterface,
	AppManagerRegistry
} from "./AppManagerProvider.vue";

export default function useAppManager() {
	const intf = inject<AppManagerInterface>(k.INTERFACE_AM);
	const registry = inject<AppManagerRegistry>(k.REGISTRY_AM);
	if (!intf || !registry) {
		throw new ComposableOutOfContextError("Cannot call useAppManager outside of an AppManagerProvider.");
	}
	return { interface: intf, registry };
}
