<script setup lang="ts">
import {useWindow} from "@/providers/WinManProvider/useWindowManager.ts";
import {charGrid} from "../constants.ts";
import Handle from "@/components/ResizeHandles/Handle.vue";
import ScrollProvider from "@/components/ScrollBar/ScrollProvider.vue";
import {computed} from "vue";
import {boxOf} from "@/util.ts";
import ScrollBars from "@/components/ScrollBar/ScrollBars.vue";
import roundToGrid from "../roundToGrid.ts";
import useMenu from "@/components/Menu/useMenu.ts";

const {props: windowProps} = useWindow();
const emit = defineEmits(["movestart", "windowfocus", "windowblur"]);

const frame = computed(() => {
	const box = boxOf(windowProps.proxyBox ?? windowProps);
	const w = box.width / charGrid.x;
	const h = box.height / charGrid.y;
	const titleSpace = Math.min(w - 8, windowProps.title.length);
	const titleTruncated = windowProps.title.slice(0, titleSpace);
	const frameStyle = roundToGrid(box);

	const titleBarText = `╔     ${titleTruncated} ${"═".repeat(w - 8 - titleSpace )}╗`
	const frameText =
		`║${" ".repeat(w - 2)} \n`.repeat(h - 1) +
		`╚${" ".repeat(w - 2)}╝`;

	return {
		titleBarText,
		frameText,
		frameStyle
	};
});

const { interface: menuIntf } = useMenu();
function focusin(e: MouseEvent) {
	menuIntf.setMenu(windowProps.menu);
	emit("windowfocus", e);
}

//[☼] ${titleTruncated}
</script>

<template>
	<div class="frame" :class="[ 'frame', 'resizeable', {focus: windowProps.focus} ]" :style="frame.frameStyle"
		 :tabindex="-1"
		 @focusin="focusin($event)" @focusout="$emit('windowblur', $event)">
		<ScrollProvider>
			<div class="textFrame">
				{{ frame.frameText}}
			</div>
			<div class="textFrameChrome">
				<div class="titleBar" @touchstart="$emit('movestart', $event)" @mousedown="$emit('movestart', $event)">
					{{ frame.titleBarText }}
				</div>
				<div class="titleClose">[☼]</div>
				<Handle class="resizeHandle" corner="se">■</Handle>
			</div>
			<ScrollBars />

			<!-- The window is absolutely positioned to float over the frame made above -->
			<div class="main">
				<div class="content">
					<slot/>
				</div>
			</div>
		</ScrollProvider>
	</div>
</template>

<style scoped lang="scss">
@use "RwWindowChrome/WindowChrome.scss";
</style>