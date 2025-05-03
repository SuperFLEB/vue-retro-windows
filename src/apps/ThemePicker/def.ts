import type {ApplicationDefinition} from "@t/Application.js";
import LauncherIcon from "@/components/Launcher/LauncherIcon.vue";
import {defineAsyncComponent} from "vue";

export const id = 'f641cb62-59dd-4733-99a4-384b4971b684';
export default {
	id,
	displayName: "Theme Picker",
	component: defineAsyncComponent(() => import("./ThemePicker.vue")),
	launcherIcon: LauncherIcon,
} as ApplicationDefinition;
