<script setup lang="ts">
import {useWindow} from "@/providers/WindowProvider/useWindow.ts";
import ResizeResizeHandle from "@/components/ResizeHandles/ResizeHandle.vue";
import ScrollProvider from "@/components/ScrollBar/ScrollProvider.vue";
import ScrollBars from "@/components/ScrollBar/ScrollBars.vue";
const {instance: windowInstance} = useWindow();
</script>

<template>
	<div class="frame" :class="[ 'frame', 'resizeable', {focus: windowInstance.focus} ]" :tabindex="-1"
		 @focusin="$emit('windowfocus', $event)" @focusout="$emit('windowblur', $event)">
		<div class="titleBar" @touchstart="$emit('movestart', $event)" @mousedown="$emit('movestart', $event)" :tabindex="-1">
			<button type="button" class="close" @click="$emit('windowclose', $event)">X</button>
			<div class="titleText">
				{{ windowInstance.title }}
			</div>
		</div>
		<div class="main">
			<ScrollProvider>
				<ScrollBars />
				<div class="contentWrapper">
					<slot/>
				</div>
			</ScrollProvider>
		</div>
		<ResizeResizeHandle class="resizeHandle" corner="se">◿</ResizeResizeHandle>
	</div>
</template>

<style scoped lang="scss">
@use "@/styles/WindowChromeBasic.scss";

.frame, .titleBar {
	box-sizing: border-box;
}

.frame {
	border: 1px solid #000;
	background-color: #fff;

	display: flex;
	flex-direction: column;

	user-select: none;
}

.resizeHandle {
	position: absolute;
	bottom: -5px;
	right: -5px;
	font-size: 20px;
	padding: 0 5px 5px 0;
	cursor: nwse-resize;
	width: 20px;
	aspect-ratio: 1 / 1;
}

.titleBar {
	flex-grow: 0;
	height: 32px;

	background-color: #fff;
	color: #000;

	font: 18px/1 Arial, sans-serif;
	text-align: center;
	align-content: center;

	border-bottom: 1px solid #000;
}

.focus > .titleBar {
	background-color: #008;
	color: #fff;
}

.main {
	user-select: text;
	flex-grow: 1;
	position: relative;

	display: grid;
	grid-template-columns: auto min-content;
	grid-template-rows: auto min-content;
}

.main {
	& > :deep(.scrollContainerX) {
		grid-column: 1;
		grid-row: 2;
	}

	& > :deep(.scrollContainerY) {
		grid-row: 1;
		grid-column: 2;
	}

}

.contentWrapper {
	grid-row: 1;
	grid-column: 1;
	position: relative;
}


</style>