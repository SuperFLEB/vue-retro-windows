import SampleImage from "./SampleImage.vue";
import LauncherIconWith from "@/components/Launcher/LauncherIconWith";
import icon from "@/assets/icons/imgview.png";

export const id = Symbol("SampleImageApp");
export default {
	id,
	displayName: "Sample Image Viewer",
	component: SampleImage,
	launcherIcon: LauncherIconWith({ src: icon }),
};
