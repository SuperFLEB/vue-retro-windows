<script setup lang="ts">
import type {MenuItemSpec} from "@/components/Menu/types.ts";
import MenuItem from "@/components/Menu/MenuItem.vue";
import Themed from "@/providers/ThemeProvider/Themed.vue";
type Props = { sub: MenuItemSpec[] };
const props = defineProps<Props>();
</script>

<template>
	<Themed is="RwSubMenu">
		<MenuItem v-for="item in props.sub" :spec="item"/>
	</Themed>
</template>
