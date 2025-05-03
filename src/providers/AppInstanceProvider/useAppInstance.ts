import {inject} from "vue";
import k from "@/providers/AppInstanceProvider/keys.ts";
import {ComposableOutOfContextError} from "@/errors.ts";
import type {AppInstanceInterface} from "@/providers/AppInstanceProvider/AppInstanceProvider.vue";

export function canUseAppInstance() {
	return Boolean(inject(k.INTERFACE));
}

export default function useAppInstance() {
	const intf = inject<AppInstanceInterface>(k.INTERFACE);
	if (!intf) throw new ComposableOutOfContextError("useAppInstance used outside an AppInstanceProvider");
	return {interface: intf};
}