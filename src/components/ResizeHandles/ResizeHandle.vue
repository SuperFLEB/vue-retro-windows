<script setup lang="ts">
import {useWindow} from "@/providers/WindowProvider/useWindow.ts";
import {useDraggable} from "@superfleb/draggable/vue";
import {getCornerPoint} from "@/util/Box.ts";
import type CardinalCorner from "@t/CardinalCorner.ts";
import type Box from "@t/Box.ts";
import {xyOf} from "@/util.ts";

type Props = { corner: CardinalCorner };
const {corner} = defineProps<Props>();
const {instance: windowInstance, interface: {moveCorner}} = useWindow();

const {dragStartHandler} = useDraggable({
		beforeStart: (_, __, instance) => {
			instance.xy = getCornerPoint(windowInstance as Box, corner);
		},
		onMove: (_, dragState) => {
			moveCorner(corner, xyOf(dragState));
		}
	}
);
</script>

<template>
	<div :class="['resizeHandle', corner]" @mousedown="dragStartHandler">
		<slot/>
	</div>
</template>

<style scoped>
.resizeHandle {
	user-select: none;
}
</style>