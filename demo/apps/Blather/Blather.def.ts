import LauncherIconWith from "@/components/Launcher/LauncherIconWith";
import icon from "@/assets/icons/document.png";
import Blather from "./Blather.vue";

export const id = Symbol("Blather");
export default {
	id,
	displayName: "Sample Document",
	component: Blather,
	launcherIcon: LauncherIconWith({ src: icon }),
};
