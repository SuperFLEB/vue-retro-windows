<script setup lang="ts">
import type {ThemeComponents} from "@/ThemedComponent/types.ts";
import useTheme from "@/providers/ThemeProvider/useTheme.ts";
import {shallowRef, watch} from "vue";

type Props = { is: keyof ThemeComponents, theme?: string };
const props = defineProps<Props>();

const {interface: {themedComponent}, themeRef} = useTheme();
const component = shallowRef(themedComponent(props.is, props.theme));
watch(themeRef, () => {
	component.value = themedComponent(props.is, props.theme);
});
</script>
<template>
	<component :is="component" v-bind="$attrs" ref="componentRef">
		<template v-for="(_, slotName) in $slots" :key="slotName" v-slot:[slotName]>
			<slot :="$attrs" :name="slotName" />
		</template>
	</component>
</template>
