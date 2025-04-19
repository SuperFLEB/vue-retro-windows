import {inject} from "vue";
import keys from "./keys.ts";
import type {MenuInterface, MenuSpecRef} from "./MenuProvider.vue";
import {ComposableOutOfContextError} from "@/errors.ts";

export function canUseMenu() {
	return !!inject<MenuInterface>(keys.INTERFACE);
}

export default function useMenu() {
	const intf = inject<MenuInterface>(keys.INTERFACE);
	const menuRef = inject<MenuSpecRef>(keys.MENUSPEC);
	if (!intf || !menuRef) throw new ComposableOutOfContextError("Attempt to use useMenu outside of a MenuProvider context");
	return {interface: intf, menuRef};
}
