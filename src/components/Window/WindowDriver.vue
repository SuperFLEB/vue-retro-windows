<script setup lang="ts">
/**
 * This sets up move and focus handlers and renders the window chrome and (themed) pane.
 */

import {computed, onMounted} from "vue";
import {useDraggable} from "@superfleb/draggable/vue";
import {useWindow} from "@/providers/WindowProvider/useWindow.ts";
import useTheme from "@/providers/ThemeProvider/useTheme.ts";
import WindowPane from "@/components/Window/WindowPane.vue";
import ThemedComponent from "@/ThemedComponent/ThemedComponent.vue";
import {boxOf} from "@/util.ts";
import type Box from "@t/Box.ts";
import RwWindowBox from "@/components/Window/RwWindowBox.vue";

type Props = { initFocused: boolean };
const props = defineProps<Props>();

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

const proxyBox = computed<Box>(() => {
	return boxOf({...windowInstance, ...windowInstance.proxyBox});
});

onMounted(() => {
	if (props.initFocused) focusinHandler();
})
</script>

<template>
	<RwWindowBox :="$attrs" :tabindex="-1">
		<ThemedComponent is="RwWindowChrome" @movestart="dragStartHandler" @click="focusinHandler" @windowfocus="focusinHandler" @windowblur="focusoutHandler">
			<WindowPane>
				<slot v-if="themeRef.mdiSubWindows" name="subWindows" />
				<slot />
			</WindowPane>
		</ThemedComponent>
	</RwWindowBox>
	<ThemedComponent v-if="themeRef.useProxyDrag && dragState.inDrag" is="RwWindowDragProxy" :proxyBox />
</template>
