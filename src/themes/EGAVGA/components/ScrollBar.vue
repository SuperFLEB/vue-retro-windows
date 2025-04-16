<script setup lang="ts">
import type {Dimension, Directional} from "@t/scroll.ts";
import {toRefs, useTemplateRef} from "vue";
import IfScroll from "@int/components/ScrollBar/IfScroll.vue";
import TrackSegment from "@int/components/ScrollBar/TrackSegment.vue";
import Thumb from "@int/components/ScrollBar/Thumb.vue";
import contentSizeRef from "@int/util/observeSize.ts";
import ScrollButton from "@int/components/ScrollBar/ScrollButton.vue";

type Props = { dimension: Dimension };
const props = defineProps<Props>();
const {dimension} = toRefs(props);

const labels: Directional<string> = {
	x: {
		back: "⮜",
		fwd: "⮞",
	},
	y: {
		back: "⮝",
		fwd: "⮟",
	},
};

const trackElementRef = useTemplateRef("track");
const trackDimensions = contentSizeRef(trackElementRef);

</script>

<template>
	<IfScroll :dimension>
		<div :="$attrs" :class="['container', dimension]">
			<div class="track" ref="track">
				<TrackSegment :dimension direction="back" class="trackSegmentVisual"/>
				<Thumb :dimension class="thumbVisual" size="auto" :trackDimensions/>
				<TrackSegment :dimension direction="fwd" class="trackSegmentVisual"/>
			</div>
			<ScrollButton :dimension direction="back" class="button back">{{ labels[dimension].back }}</ScrollButton>
			<ScrollButton :dimension direction="fwd" class="button fwd">{{ labels[dimension].fwd }}</ScrollButton>
		</div>
	</IfScroll>
</template>

<style scoped lang="scss">
@use "@int/components/ScrollBar/ScrollBarBasic.scss" with (
	$size: 16px
);
@use "./ScrollBar.scss";
</style>