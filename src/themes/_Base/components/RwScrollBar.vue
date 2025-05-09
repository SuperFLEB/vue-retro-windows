<script setup lang="ts">
import type {Dimension, DimensionalDirectional} from "@t/scroll.ts";
import {toRefs, useTemplateRef} from "vue";
import IfScroll from "@/components/ScrollBar/IfScroll.vue";
import TrackSegment from "@/components/ScrollBar/TrackSegment.vue";
import Thumb from "@/components/ScrollBar/Thumb.vue";
import contentSizeRef from "@/util/observeSize.ts";
import ScrollButton from "@/components/ScrollBar/ScrollButton.vue";

type Props = { dimension: Dimension };
const props = defineProps<Props>();
const {dimension} = toRefs(props);

const labels: DimensionalDirectional<string> = {
	x: {
		back: "🡄",
		fwd: "🡆",
	},
	y: {
		back: "🡅",
		fwd: "🡇",
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
				<Thumb :dimension class="thumbVisual" size="square" :trackDimensions />
				<TrackSegment :dimension direction="fwd" class="trackSegmentVisual"/>
			</div>
			<ScrollButton :dimension direction="back" class="button back">{{ labels[dimension].back }}</ScrollButton>
			<ScrollButton :dimension direction="fwd" class="button fwd">{{ labels[dimension].fwd }}</ScrollButton>
		</div>
	</IfScroll>
</template>

<style scoped lang="scss">
@use "@/components/ScrollBar/ScrollBarBasic" with (
	$size: 30px
);

.trackSegmentVisual {
	background-color: #888;

	&:hover:active {
		background-color: #333;
	}
}

.thumbVisual {
	background-color: #ccc;
	border: 4px double #333;
	position: absolute;
	z-index: 2;
}

.x .thumbVisual {
	top: 0;
	bottom: 0;
}

.y .thumbVisual {
	left: 0;
	right: 0;
}
</style>