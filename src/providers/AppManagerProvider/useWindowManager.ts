import {inject} from "vue";
import k from "./keys.ts";
import {ComposableOutOfContextError} from "@/errors.js";
import type {
	WindowManagerInterface,
	WindowManagerRegistry
} from "./AppManagerProvider.vue";

export default function useWindowManager() {
	const intf = inject<WindowManagerInterface>(k.INTERFACE_WM);
	const registry = inject<WindowManagerRegistry>(k.REGISTRY_WM);
	if (!intf || !registry) {
		throw new ComposableOutOfContextError("Cannot call useWindowManager outside of an AppManagerProvider.");
	}
	return { interface: intf, registry };
}
