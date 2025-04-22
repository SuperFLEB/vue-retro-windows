import {h} from "vue";
import LauncherIcon from "./LauncherIcon.vue";
type Props = { src: string | undefined };
export default function (props: Props) {
	return h(LauncherIcon, { src: props.src });
};