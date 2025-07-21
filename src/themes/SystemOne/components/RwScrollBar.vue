<script setup lang="ts">
import type {Dimension, Directional, ScrollDirection} from "@t/scroll.ts";
import {ref, toRefs, useTemplateRef} from "vue";
import TrackSegment from "@/components/ScrollBar/TrackSegment.vue";
import ScrollBarThumb from "@/components/ScrollBar/ScrollBarThumb.vue";
import contentSizeRef from "@/util/observeSize.ts";
import ScrollButton from "@/components/ScrollBar/ScrollButton.vue";
import useCanScroll from "@/composables/useCanScroll.ts";

type Props = { dimension: Dimension };
const props = defineProps<Props>();
const {dimension} = toRefs(props);

const labels: Directional<string> = {
	x: {
		back: "⇦←",
		fwd: "⇨→",
	},
	y: {
		back: "⇧↑",
		fwd: "⇩↓",
	},
}[props.dimension];

const activeLabel = ref({
	back: labels.back[0],
	fwd: labels.fwd[0],
});

const trackElementRef = useTemplateRef("track");
const trackDimensions = contentSizeRef(trackElementRef);
const canScroll = useCanScroll();

const labelEvents = (direction: ScrollDirection) => ({
	mousedown: () => activeLabel.value[direction] = labels[direction][1],
	mouseup: () => activeLabel.value[direction] = labels[direction][0],
});

</script>

<template>
	<div :="$attrs"
		 :class="['container', { active: canScroll[dimension] }, { inactive: !canScroll[dimension] }, dimension]">
		<div class="track" ref="track">
			<template v-if="canScroll[dimension]">
				<TrackSegment :dimension direction="back" class="trackSegmentVisual"/>
				<ScrollBarThumb :dimension class="thumbVisual" size="square" :trackDimensions :proxy-drag="true"/>
				<TrackSegment :dimension direction="fwd" class="trackSegmentVisual"/>
			</template>
		</div>
		<ScrollButton :disabled="!canScroll[dimension]" :dimension direction="back" class="button back" v-on="labelEvents('back')">{{ activeLabel.back }}</ScrollButton>
		<ScrollButton :disabled="!canScroll[dimension]" :dimension direction="fwd" class="button fwd" v-on="labelEvents('fwd')">{{ activeLabel.fwd }}</ScrollButton>
	</div>
</template>

<style src="../assets/SystemOneUI.css" />
<style scoped lang="scss">
@use "@/components/ScrollBar/ScrollBarBasic.scss" with (
			$size: 26px
		);
@use "RwScrollBar";
</style>