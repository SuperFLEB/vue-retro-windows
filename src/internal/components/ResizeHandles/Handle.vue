<script setup lang="ts">
import {useWindow} from "@int/components/WindowManagementProvider/useWindowManager.ts";
import {useDraggable} from "@superfleb/draggable/vue";
import {getCornerPoint} from "./util.ts";
import type CardinalCorner from "@t/CardinalCorner.ts";
import type Box from "@t/Box.ts";
import {xyOf} from "@int/util.ts";

type Props = { corner: CardinalCorner };
const {corner} = defineProps<Props>();
const {props: windowProps, interface: {moveCorner}} = useWindow();

const {dragStartHandler} = useDraggable({
		beforeStart: (_, __, instance) => {
			instance.xy = getCornerPoint(windowProps as Box, corner);
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