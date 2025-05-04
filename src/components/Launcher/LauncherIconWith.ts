import {h} from "vue";
import LauncherIcon from "./LauncherIcon.vue";
type LauncherIconProps = { src: string | undefined };
export default function (props: LauncherIconProps) {
	return h(LauncherIcon, { src: props.src });
};