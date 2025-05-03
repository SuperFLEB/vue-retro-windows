import type {ApplicationDefinition} from "@t/Application.js";
import LauncherIconWith from "@/components/Launcher/LauncherIconWith.ts";
import {defineAsyncComponent} from "vue";
import src from "@/assets/icons/help.png";

export const id = "370fe174-0c1f-4a8a-8f61-976cddbbb4c9";
export default {
	id,
	displayName: "About",
	component: defineAsyncComponent(() => import("./AboutApp.vue")),
	launcherIcon: LauncherIconWith({ src }),
} as ApplicationDefinition;
