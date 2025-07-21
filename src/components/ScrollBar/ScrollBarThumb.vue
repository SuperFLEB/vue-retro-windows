3<script setup lang="ts">
import {computed, ref, toRefs, useTemplateRef} from "vue";
import {
	antidimension,
	fixedThumbPixelToScroll,
	fixedThumbPosition,
	lengthStyles,
	offsetLength,
	percent,
	posStyles
} from "@/components/ScrollBar/util.ts";
import useScroll from "@/components/ScrollBar/useScroll.ts";
import {xyOfDim} from "@/util.ts";
import {useDraggable} from "@superfleb/draggable/vue";
import type {Dimension} from "@t/scroll.ts";
import type XY from "@t/XY.ts";
import clamp from "@/util/clamp.ts";


type Props = { size?: number | "auto" | "square", dimension: Dimension, trackDimensions: XY, proxyDrag?: boolean };
const props = withDefaults(defineProps<Props>(), {
	size: "auto",
	proxyDrag: false,
});

const {dimension, proxyDrag} = props;
const {size, trackDimensions} = toRefs(props);
const {state: scrollStates, interface: scrollIntf} = useScroll();
const thumbRef = useTemplateRef("thumb");

const style = computed(() => {
	return styleFromStart(scrollStates.value[dimension].start);
});

const proxyStyle = ref({});

const styleFromStart = (start: number) => {
	const scrollState = scrollStates.value[dimension];

	if (size.value === "auto") {
		start = clamp(start, 0, 1 - scrollState.windowSize);
		return {
			[lengthStyles[dimension]]: percent(scrollState.windowSize),
			[posStyles[dimension].back]: percent(start),
		};
	}

	type XYSS = XY & { size: number, span: number };
	const rect: XYSS = {...trackDimensions.value, size: 0, span: 0};
	rect.size = rect[dimension];
	rect.span = rect[antidimension(dimension)];

	const thumbSize = size.value === "square" ? rect.span : size.value;

	const at = scrollState.windowSize < 1 ? start / (1 - scrollState.windowSize) : 0;
	const thumbPosition = fixedThumbPosition(at, rect.size, thumbSize);

	if (size.value === "square") {
		return {
			[posStyles[dimension].back]: `${thumbPosition}px`,
			[lengthStyles[antidimension(dimension)]]: "100%",
			aspectRatio: "1 / 1",
		};
	}

	return {
		[lengthStyles[dimension]]: `${size.value}px`,
		[posStyles[dimension].back]: `${thumbPosition}px`,
	};
};

const {dragStartHandler, stateRef} = useDraggable({
	beforeStart: (_, __, instance) => {
		// initialScroll.value = scrollStates.value[dimension].start;
		const thumb = thumbRef.value;
		const start = scrollStates.value[dimension].start;
		const trackLength = trackDimensions.value[dimension];

		instance.pixelSize = fixedThumbPixelToScroll(
			scrollStates.value[dimension],
			trackLength,
			offsetLength(thumb!, dimension),
		);
		instance.xy = {x: 0, y: 0, [dimension]: start};
	},
	onChange: (_, dragState) => {
		if (proxyDrag) {
			 proxyStyle.value = styleFromStart(dragState[dimension]);
			 return;
		}
		scrollIntf.scrollToFraction(xyOfDim(dimension, dragState[dimension]));
	},
	onEnd: (_, dragState) => {
		if (proxyDrag) {
			scrollIntf.scrollToFraction(xyOfDim(dimension, dragState[dimension]));
		}
	}
});
</script>

<template>
	<div v-if="proxyDrag && stateRef.inDrag" :class="['thumbProxy', dimension]" :style="proxyStyle" />
	<div :class="['thumb', dimension]" ref="thumb" :style :="$attrs" @mousedown="dragStartHandler">
		<slot/>
	</div>
</template>

<style scoped>
.thumb {
	position: absolute;
}
.thumbProxy {
	position: absolute;
}
</style>