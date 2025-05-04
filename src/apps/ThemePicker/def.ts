import type {ApplicationDefinition} from "@t/Application.js";
import LauncherIconWith from "@/components/Launcher/LauncherIconWith.ts";
import {defineAsyncComponent} from "vue";
import icon from "@/assets/icons/theme.png";

export const id = "f641cb62-59dd-4733-99a4-384b4971b684";
export default {
	id,
	displayName: "Theme Picker",
	component: defineAsyncComponent(() => import("./ThemePicker.vue")),
	launcherIcon: LauncherIconWith({src: icon}),
	recyclable: true,
} as ApplicationDefinition;
