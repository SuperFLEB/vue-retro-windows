<script setup lang="ts">
import type Box from "@t/Box.ts";
import {computed} from "vue";
import {stylesOf} from "@/util.ts";
import {dotPattern} from "@/themeutil.ts";

type Props = { proxyBox: Box };
const props = defineProps<Props>();
const style = computed(() => ({
	...stylesOf(props.proxyBox),
	...dotPattern(1, 2)
}));
</script>

<template>
	<div class="dragProxy" :style></div>
</template>

<style scoped lang="scss">
.dragProxy {
	box-sizing: border-box;
	position: absolute;
	z-index: 100;
	border: 4px solid #fff;
	mix-blend-mode: exclusion;
}
</style>