import LauncherIconWith from "@/components/Launcher/LauncherIconWith";
import icon from "@/assets/icons/app1.png";
import Blather from "./Blather.vue";

export const id = Symbol("Blather");
export default {
	id,
	displayName: "Sample Window",
	component: Blather,
	launcherIcon: LauncherIconWith({ src: icon }),
};
