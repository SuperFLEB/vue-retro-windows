import type {ThemeComponents} from "@/ThemedComponent/types.js";
import {h, type SetupContext} from "vue";
import ThemedComponent from "@/ThemedComponent/ThemedComponent.vue";

export default function themedComponent(name: keyof ThemeComponents) {
	return (props: Record<string, any>, {slots, emit, attrs}: SetupContext) => {
		return h(ThemedComponent, {...props, ...emit, ...attrs, is: name}, slots);
	};
};
