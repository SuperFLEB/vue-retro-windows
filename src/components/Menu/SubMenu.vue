<script setup lang="ts">
import type {MenuItemSpec} from "@/components/Menu/types.ts";
import MenuItem from "@/components/Menu/MenuItem.vue";
import ThemedComponent from "@/ThemedComponent/ThemedComponent.vue";
type Props = { sub: MenuItemSpec[] };
const props = defineProps<Props>();
</script>

<template>
	<ThemedComponent is="RwSubMenu">
		<MenuItem v-for="(item, index) in props.sub" :spec="item" :key="index"/>
	</ThemedComponent>
</template>
