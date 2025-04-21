import {h} from "vue";
import FailedComponent from "@/components/FailedComponent/FailedComponent.vue";

type FailedComponentProps = {
	name: string;
	themeName: string;
}
export default function getFailedComponent({ name, themeName }: FailedComponentProps) {
	return h(FailedComponent, { name, themeName });
}