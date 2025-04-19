<script setup lang="ts">
import type {Dimension, ScrollDirection} from "@t/scroll.ts";
import useScroll from "@/components/ScrollBar/useScroll.ts";
import {getScrollProportion, lengthStyles, percent} from "@/components/ScrollBar/util.ts";
import {computed} from "vue";
import useRepeatButton from "@/composables/useRepeatButton.ts";
import {xyOfDim} from "@/util.ts";

type Props = { dimension: Dimension, direction: ScrollDirection, repeatTimeout?: number };
const {dimension, direction, repeatTimeout} = defineProps<Props>();

const {state: scrollStates, interface: intf} = useScroll();
const lengthStyle = lengthStyles[dimension];
const style = computed(() =>
	({
		[lengthStyle]: percent(direction === "back" ? scrollStates.value[dimension].at : 1 - scrollStates.value[dimension].at),
	}));

const tick = () => {
	const fraction = getScrollProportion(scrollStates.value[dimension], direction === "back" ? -1 : 1, 0);
	intf.scrollByFraction(xyOfDim(dimension, fraction, 0));
}
const {mouseDownHandler} = useRepeatButton(tick, repeatTimeout ?? 50);
</script>

<template>
<div :class="['trackSegment', direction, dimension]" :style @mousedown="mouseDownHandler" :="$attrs"><slot /></div>
</template>

<style scoped>
.trackSegment {
	position: absolute;
}

.trackSegment.x {
	height: 100%;
	&.back { left: 0; }
	&.fwd { right: 0; }
}

.trackSegment.y {
	width: 100%;
	&.back { top: 0; }
	&.fwd { bottom: 0; }
}
</style>