<script setup lang="ts">
import type XY from "@t/XY.js";
import defaultIcon from "@/assets/icons/genericApp.png";
type Props = { size?: XY, src?: string };
const props = withDefaults(defineProps<Props>(), {
	src: defaultIcon,
	size: () => ({ x: 48, y: 48 }),
});
</script>

<template>
	<img :src="props.src" :width="props.size.x" :height="props.size.y" alt="Icon" />
</template>