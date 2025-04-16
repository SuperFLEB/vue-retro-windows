<script setup lang="ts">
import {useWindow} from "@/components/WindowManagementProvider/useWindowManager.ts";
import ResizeHandle from "@/components/ResizeHandles/Handle.vue";
import ScrollProvider from "@/components/ScrollBar/ScrollProvider.vue";
import ScrollBars from "@/components/ScrollBar/ScrollBars.vue";

const {props: windowProps} = useWindow();
</script>

<template>
	<div class="frame" :class="[ 'frame', 'resizeable', {focus: windowProps.focus} ]" :tabindex="-1"
		 @focusin="$emit('windowfocus', $event)" @focusout="$emit('windowblur', $event)">
		<div class="titleBar"  @touchstart="$emit('movestart', $event)" @mousedown="$emit('movestart', $event)" :tabindex="-1">
			{{ windowProps.title }}
		</div>
		<div class="main">
			<ScrollProvider>
				<ScrollBars />
				<div class="contentWrapper">
					<slot/>
				</div>
			</ScrollProvider>
		</div>
		<ResizeHandle class="resizeHandle" corner="se">◿</ResizeHandle>
	</div>
</template>

<style scoped src="@/themes/Console/assets/DOS437Unicode.scss" />
<style scoped lang="scss">
@use "@/styles/WindowChromeBasic.scss";
@use "@/assets/DOS437Unicode/index";

.frame {
	font-family: "DOS437Unicode", sans-serif;
	font-size: 8px;

	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;

	display: flex;
	flex-direction: column;

	border: 3px outset #fff;
}

.frame.focus {
	& > .titleBar {
		color: #eee;
		background-color: #666;
	}

	& .main {
		background-color: #ddd;
	}
}

.frame > .contents {
	background-color: #ccc;
	flex-grow: 1;
	position: relative;
}

.frame > .titleBar {
	color: #000;
	background-color: #888;
	padding: 0.5em 0.5em;
	white-space: nowrap;
	text-align: center;

	user-select: none;
}

.main {
	background-color: #ccc;
}

.resizeHandle {
	cursor: nwse-resize;
	position: absolute;
	width: 30px;
	aspect-ratio: 1 / 1;
	bottom: -10px;
	right: -10px;
	z-index: -1;
}
</style>