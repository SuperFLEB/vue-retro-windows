<script setup lang="ts">
/**
 * This sets up move and focus handlers and renders the window chrome and (themed) pane.
 */

import {computed, type CSSProperties} from "vue";
import {useDraggable} from "@superfleb/draggable/vue";
import {useWindow} from "@int/components/WindowManagementProvider/useWindowManager.ts";
import useTheme from "@int/components/ThemeProvider/useTheme.ts";
import Pane from "@int/components/Pane.vue";
import Themed from "@int/components/ThemeProvider/Themed.vue";
import {boxOf} from "@int/util.ts";
import type Box from "@t/Box.ts";

const {props: windowProps, interface: winManIntf} = useWindow();
const {themeRef} = useTheme();

const focusinHandler = () => {
	winManIntf.focus();
};
const focusoutHandler = (e: MouseEvent) => {
	if ((e.currentTarget as Node | null)?.contains(e?.relatedTarget as Node | null)) return;
	winManIntf.blur();
};

const {dragStartHandler, stateRef: dragState} = useDraggable(
	{
		onMove: (_, dragState) => {
			winManIntf.proxyMoveTo(dragState);
		},
		onEnd: (_, dragState) => {
			winManIntf.moveTo(dragState);
			winManIntf.proxyDrop();
		}
	},
	{
		startXy: {x: windowProps.x, y: windowProps.y},
	}
);

const windowBox = computed<Box>(() => themeRef.value && boxOf(windowProps));
const proxyBox = computed<Box>(() => {
	return boxOf({...windowBox.value, ...windowProps.proxyBox});
});
const windowStyle = computed<CSSProperties>(() => {
	const box = themeRef.value.useProxyDrag ? windowBox.value : proxyBox.value;
	return {
		position: "absolute",
		left: box.x + "px",
		top: box.y + "px",
		width: box.width + "px",
		height: box.height + "px",
		zIndex: windowProps.z,
	}
});
</script>

<template>
	<slot v-if="!themeRef.mdiSubWindows" name="subWindows" />
	<div :="$attrs" class="windowDriver" :tabindex="-1" :style="windowStyle">
		<Themed is="WindowChrome" @movestart="dragStartHandler($event)" @click="focusinHandler" @windowfocus="focusinHandler" @windowblur="focusoutHandler">
			<Pane>
				<slot v-if="themeRef.mdiSubWindows" name="subWindows" />
				<slot />
			</Pane>
		</Themed>
	</div>
	<Themed v-if="themeRef.useProxyDrag && dragState.inDrag" is="WindowDragProxy" :proxyBox :windowBox/>
</template>
