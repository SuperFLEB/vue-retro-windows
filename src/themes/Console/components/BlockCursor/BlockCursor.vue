<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref, type Ref, toRefs, watch} from "vue";
import type XY from "@t/XY.ts";
import {charGrid} from "../../constants.ts";

export type BlockCursorType = "block" | "invert";
export type GridSize = { x: number; y: number };

type Props = {
	elementRef?: Ref<HTMLElement>;
	type?: BlockCursorType;
	colors?: [string, string];
	gridSize?: GridSize
};

const props = withDefaults(defineProps<Props>(), {
	elementRef: () => ref(document.body as HTMLElement),
	type: "invert",
	colors: () => ["#fff", "#000"],
	gridSize: () => ({...charGrid}),
});
const {elementRef, type, colors, gridSize} = toRefs(props);

const cursorRef = ref<HTMLElement>(null);
const positionRef = ref<XY>({x: 0, y: 0});

const onCursorMove = (e: MouseEvent) => {
	if (!cursorRef.value) return;

	const parent = cursorRef.value.offsetParent ?? document.body;
	const parentRect = parent.getBoundingClientRect();
	const realPos = {
		x: e.clientX - parentRect.left,
		y: e.clientY - parentRect.top,
	};

	const gridPosition = {
		x: Math.floor(realPos.x / gridSize.value.x) * gridSize.value.x,
		y: Math.floor(realPos.y / gridSize.value.y) * gridSize.value.y,
	};

	Object.assign(positionRef.value, gridPosition);
};

const styles = computed(() => ({
	left: `${positionRef.value.x}px`,
	top: `${positionRef.value.y}px`,
	width: `${gridSize.value.x}px`,
	height: `${gridSize.value.y}px`,
	color: type.value === "invert" ? "#fff" : "inherit",
}))

onMounted(() => {
	elementRef.value.addEventListener("mousemove", onCursorMove);
	elementRef.value.classList.add("winman-cursor-hide");
});

onUnmounted(() => {
	if (elementRef.value) elementRef.value.classList.remove("winman-cursor-hide");
	if (!cursorRef.value) return;
});
</script>

<template>
	<Teleport v-if="elementRef" :to="elementRef">
		{{styles}}
		<div ref="cursorRef" :class="['cursor', {invert: type === 'invert'}]" :style="styles" />
	</Teleport>
</template>

<style lang="scss" scoped>
.cursor {
	position: absolute;
	font-family: "DOS437Unicode", monospace;
	background-color: #fff;

	pointer-events: none;
	z-index: 125000;
}
.cursor.invert {
	background-color: transparent;
	backdrop-filter: invert(100%);
}
</style>

<style>
.winman-cursor-hide, .winman-cursor-hide * {
	cursor: none;
}
</style>