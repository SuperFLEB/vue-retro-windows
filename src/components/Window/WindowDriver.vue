<script setup lang="ts">
/**
 * This sets up move and focus handlers and renders the window chrome and (themed) pane.
 */

import {computed, type CSSProperties} from "vue";
import {useDraggable} from "@superfleb/draggable/vue";
import {useWindow} from "@/providers/WindowProvider/useWindow.ts";
import useTheme from "@/providers/ThemeProvider/useTheme.ts";
import WindowPane from "@/components/Window/WindowPane.vue";
import Themed from "@/themed/Themed.vue";
import {boxOf} from "@/util.ts";
import type Box from "@t/Box.ts";

const {instance: windowInstance, interface: windowInterface} = useWindow();
const {themeRef} = useTheme();

const focusinHandler = () => {
	windowInterface.focus();
};
const focusoutHandler = (e: MouseEvent) => {
	if ((e.currentTarget as Node | null)?.contains(e?.relatedTarget as Node | null)) return;
	windowInterface.blur();
};

const {dragStartHandler, stateRef: dragState} = useDraggable(
	{
		onMove: (_, dragState) => {
			windowInterface.proxyMoveTo(dragState);
		},
		onEnd: (_, dragState) => {
			windowInterface.moveTo(dragState);
			windowInterface.proxyDrop();
		}
	},
	{
		startXy: {x: windowInstance.x, y: windowInstance.y},
	}
);

const windowBox = computed<Box>(() => {
	return themeRef.value && boxOf(windowInstance);
});

const proxyBox = computed<Box>(() => {
	return boxOf({...windowBox.value, ...windowInstance.proxyBox});
});

const windowStyle = computed<CSSProperties>(() => {
	const box = themeRef.value.useProxyDrag ? windowBox.value : proxyBox.value;
	return {
		position: "absolute",
		left: box.x + "px",
		top: box.y + "px",
		width: box.width + "px",
		height: box.height + "px",
		zIndex: windowInstance.z,
	}
});
</script>

<template>
	<slot v-if="!themeRef.mdiSubWindows" name="subWindows" />
	<div :="$attrs" class="windowDriver" :tabindex="-1" :style="windowStyle">
		<Themed is="RwWindowChrome" @movestart="dragStartHandler($event)" @click="focusinHandler" @windowfocus="focusinHandler" @windowblur="focusoutHandler">
			<WindowPane>
				<slot v-if="themeRef.mdiSubWindows" name="subWindows" />
				<slot />
			</WindowPane>
		</Themed>
	</div>
	<Themed v-if="themeRef.useProxyDrag && dragState.inDrag" is="RwWindowDragProxy" :proxyBox :windowBox/>
</template>
