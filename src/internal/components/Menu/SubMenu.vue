<script setup lang="ts">
import type {MenuItemSpec} from "@int/components/Menu/types.ts";
import MenuItem from "@int/components/Menu/MenuItem.vue";
import Themed from "@int/components/ThemeProvider/Themed.vue";
type Props = { sub: MenuItemSpec[] };
const props = defineProps<Props>();
</script>

<template>
	<Themed is="SubMenu" :sub="props.sub">
		<MenuItem v-for="item in props.sub" :spec="item"/>
	</Themed>
</template>

<style scoped>

</style>