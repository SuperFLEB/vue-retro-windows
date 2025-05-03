import {inject, type ShallowRef} from "vue";
import type {
	ApplicationCollectionInterface,
	ApplicationCollectionRegistry
} from "./ApplicationCollectionProvider.vue";
import k from "./keys.ts";
import {ComposableOutOfContextError} from "@/errors.js";

export default function useApplicationCollection() {
	const intf = inject<ApplicationCollectionInterface>(k.INTERFACE);
	const registry = inject<ShallowRef<ApplicationCollectionRegistry>>(k.REGISTRY);
	if (!intf || !registry) {
		throw new ComposableOutOfContextError("Cannot call useApplicationCollection outside of an ApplicationCollectionProvider.");
	}
	return { registry, interface: intf };
}
