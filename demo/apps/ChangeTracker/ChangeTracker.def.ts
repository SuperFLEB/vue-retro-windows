import LauncherIconWith from "@/components/Launcher/LauncherIconWith";
import icon from "@/assets/icons/stopwatch.png";
import ChangeTracker from "./ChangeTracker.vue";

export const id = Symbol("ChangeTracker");
export default {
	id,
	displayName: "Change Tracker",
	component: ChangeTracker,
	launcherIcon: LauncherIconWith({ src: icon }),
};
