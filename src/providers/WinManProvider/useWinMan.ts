import {inject} from "vue";
import {WinMan as wm} from "@/providers/WinManProvider/keys.js";
import type {WinManInterface} from "@/providers/WinManProvider/WinManProvider.vue";

export const useWindowManager = () => {
	const intf = inject<WinManInterface>(wm.INTERFACE);
	return {interface: intf};
};

