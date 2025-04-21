<script setup lang="ts">
import type Box from "@t/Box.ts";
import {computed} from "vue";
import {stylesOf} from "@/util.ts";
const props = defineProps<{ proxyBox: Box }>();
const style = computed(() => ({
	...stylesOf(props.proxyBox)
}));
</script>

<template>
	<div class="dragProxy" :style></div>
</template>

<style scoped>
.dragProxy {
	box-sizing: border-box;
	position: absolute;
	z-index: 100;
	border: 4px solid #fff;
	mix-blend-mode: difference;
}
</style>