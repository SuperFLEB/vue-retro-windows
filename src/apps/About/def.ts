import type {ApplicationDefinition} from "@t/Application.js";
import LauncherIconWith from "@/components/Launcher/LauncherIconWith.ts";
import {defineAsyncComponent} from "vue";
import src from "@/assets/icons/help.png";

export const id = Symbol("AboutApp");
export default {
	id,
	displayName: "About",
	component: defineAsyncComponent(() => import("./AboutApp.vue")),
	launcherIcon: LauncherIconWith({ src }),
} as ApplicationDefinition;
