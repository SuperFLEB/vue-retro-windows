import type {ThemeComponents} from "@/themed/types.js";
import {h, type SetupContext} from "vue";
import Themed from "@/themed/Themed.vue";

export default function themedComponent(name: keyof ThemeComponents) {
	return (props: Record<string, any>, {slots, emit, attrs}: SetupContext) => {
		return h(Themed, {...props, ...emit, ...attrs, is: name}, slots);
	};
};
