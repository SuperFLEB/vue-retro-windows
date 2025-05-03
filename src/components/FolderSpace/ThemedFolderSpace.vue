<script setup lang="ts">
import {onMounted, onUnmounted, ref, useTemplateRef} from "vue";
import {calculateGridModel, getGridCell, type GridModel} from "@/util/gridmodel.js";

type Props = { rtl: boolean, column: boolean };
const props = withDefaults(defineProps<Props>(), { rtl: false, column: false });

const gridRef = useTemplateRef("grid");
let lastSize: [number, number] = [NaN, NaN];
let gridModel: GridModel | undefined;
let obs: ResizeObserver;

onMounted(() => {
	obs = new ResizeObserver((entries: ResizeObserverEntry[]) => {
		const entry = entries[0];
		const rect = entry.contentRect;
		if (lastSize[0] === rect.width && lastSize[1] === rect.height) return;
		lastSize = [rect.width, rect.height];
		gridModel = calculateGridModel(gridRef.value!);
	});
	obs.observe(gridRef.value!);
});

onUnmounted(() => {
	if (gridModel) gridModel = undefined;
	if (obs) obs.disconnect();
})

const style = {
	...(props.rtl ? {direction: "rtl"} : undefined),
	"grid-auto-flow": props.column ? "column" : "row",
};
const debugStyle = ref({});

</script>

<template>
<div class="folderSpace" ref="grid" :style>
	<slot></slot>
</div>
</template>

<style scoped>
.debug {
	background-color: #f00;
	inset: 0;
	grid-column: 1;
	grid-row: 1;
	display: none;
}

.folderSpace {
	display: grid;
	box-sizing: border-box;
	position: absolute;

	max-height: 100%;
	max-width: 100%;

	grid-template-columns: repeat(auto-fill, 64px);
	grid-template-rows: repeat(auto-fill, 128px);
	grid-gap: 1ch;
}

.folderSpace > * {
	direction: initial;
}
</style>