<script setup lang="ts">
import type {Dimension, Directional} from "@t/scroll.ts";
import {toRefs, useTemplateRef} from "vue";
import TrackSegment from "@int/components/ScrollBar/TrackSegment.vue";
import Thumb from "@int/components/ScrollBar/Thumb.vue";
import contentSizeRef from "@int/util/observeSize.ts";
import ScrollButton from "@int/components/ScrollBar/ScrollButton.vue";
import useCanScroll from "@int/composables/useCanScroll.ts";

type Props = { dimension: Dimension };
const props = defineProps<Props>();
const {dimension} = toRefs(props);

const labels: Directional<string> = {
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
const canScroll = useCanScroll();

</script>

<template>
	<div :="$attrs"
		 :class="['container', { active: canScroll[dimension] }, { inactive: !canScroll[dimension] }, dimension]">
		<div class="track" ref="track">
			<template v-if="canScroll[dimension]">
				<TrackSegment :dimension direction="back" class="trackSegmentVisual"/>
				<Thumb :dimension class="thumbVisual" size="square" :trackDimensions :proxy-drag="true"/>
				<TrackSegment :dimension direction="fwd" class="trackSegmentVisual"/>
			</template>
		</div>
		<ScrollButton :disabled="!canScroll[dimension]" :dimension direction="back" class="button back">{{ labels[dimension].back }}</ScrollButton>
		<ScrollButton :disabled="!canScroll[dimension]" :dimension direction="fwd" class="button fwd">{{ labels[dimension].fwd }}</ScrollButton>
	</div>
</template>

<style scoped lang="scss">
@use "@int/components/ScrollBar/ScrollBarBasic.scss" with (
			$size: 26px
		);
@use "./ScrollBar.scss";
</style>