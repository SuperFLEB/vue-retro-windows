<script setup lang="ts">
import type {ThemeComponents} from "@t/Theme.ts";
import useTheme from "@int/components/ThemeProvider/useTheme.ts";
import {shallowRef, watch} from "vue";

type Props = { is: keyof ThemeComponents };
const {is} = defineProps<Props>();

const {interface: {themedComponent}, themeRef} = useTheme();
const component = shallowRef(themedComponent(is));
watch(themeRef, () => {
	component.value = themedComponent(is);
});
</script>
<template>
	<component :is="component" :="$attrs" ref="componentRef">
		<template v-for="(_, slotName) in $slots" :key="slotName" v-slot:[slotName]>
			<slot :="$attrs" :name="slotName" />
		</template>
	</component>
</template>
<style scoped>

</style>