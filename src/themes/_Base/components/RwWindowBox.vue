<script setup lang="ts">
import {computed, type CSSProperties} from "vue";
import type {WindowState} from "@t/WindowInstance.ts";
import type Box from "@t/Box.ts";
import useTheme from "@/providers/ThemeProvider/useTheme.ts";
type Props = { state: WindowState, box: Box, z: number };
const props = defineProps<Props>();

const { themeRef } = useTheme();
const capabilities = computed(() => [
	themeRef.value.canMinimize && "canMinimize",
	themeRef.value.canMaximize && "canMaximize",
	!themeRef.value.canMinimize && "noMinimize",
	!themeRef.value.canMaximize && "noMaximize",
].filter(v => v));

const style = computed<CSSProperties>(() => ({
	"--winX": props.box.x + "px",
	"--winY": props.box.y + "px",
	"--winZ": props.z,
	"--winW": props.box.width + "px",
	"--winH": props.box.height + "px",
}));
</script>

<template>
	<div :class="['windowBox', ...capabilities, state]" :style>
		<slot/>
	</div>
</template>

<style lang="scss" scoped>
	.windowBox {
		position: absolute;
		z-index: var(--winZ);
	}

	.windowBox.NORMAL, .windowBox.noMinimize.MINIMIZED, .windowBox.noMaximize.MAXIMIZED {
		left: var(--winX);
		top: var(--winY);
		width: var(--winW);
		height: var(--winH);
	}

	.windowBox.canMinimize.MINIMIZED {
		display: none;
	}

	.windowBox.canMaximize.MAXIMIZED {
		inset: 0;
	}
</style>