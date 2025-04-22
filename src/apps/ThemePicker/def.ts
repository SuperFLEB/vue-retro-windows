import type {ApplicationDefinition} from "@t/Application.js";
import LauncherIcon from "@/components/Launcher/LauncherIcon.vue";
import {defineAsyncComponent} from "vue";

export const id = Symbol("ThemePicker");
export default {
	id,
	displayName: "Theme Picker",
	component: defineAsyncComponent(() => import("./ThemePicker.vue")),
	launcherIcon: LauncherIcon,
} as ApplicationDefinition;
