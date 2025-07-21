import {type ComputedRef, inject} from "vue";
import k from "./keys.ts";
import {ComposableOutOfContextError} from "@/errors.js";
import type {BindWindowManagerInterface, WindowManagerInterface, WindowManagerRegistry} from "./AppManagerProvider.vue";
import type {ChildrenByState} from "@t/ChildrenByState.ts";

export default function useWindowManager() {
	const intf = inject<WindowManagerInterface>(k.INTERFACE_WM);
	const registry = inject<WindowManagerRegistry>(k.REGISTRY_WM);
	const bindInterface = inject<BindWindowManagerInterface>(k.BIND_INTERFACE_WM);
	const childrenByState = inject<ComputedRef<ChildrenByState>>(k.CHILDREN_BY_STATE_WM);
	if (!intf || !registry || !bindInterface || !childrenByState) {
		throw new ComposableOutOfContextError("Cannot call useWindowManager outside of an AppManagerProvider.");
	}
	return { interface: intf, registry, bindInterface, childrenByState };
}
