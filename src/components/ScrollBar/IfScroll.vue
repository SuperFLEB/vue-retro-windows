<script setup lang="ts">
import useScroll from "@/components/ScrollBar/useScroll.ts";
import {computed} from "vue";
import type {Dimension} from "@t/scroll.ts";
import type XY from "@t/XY.ts";

type DimensionPreference = Dimension | "both" | "either";
type Props = { dimension?: DimensionPreference, invert?: boolean };
const props = withDefaults(defineProps<Props>(), {
	dimension: "either",
	invert: false,
	useOverflow: true,
});
const { visible, state } = useScroll();

const show = computed(() => {
	const canScroll: XY<boolean> = {
		x: visible.value.x && state.value.x.windowSize < 1,
		y: visible.value.y && state.value.y.windowSize < 1,
	};
	if (props.dimension in canScroll) return canScroll[props.dimension];
	if (props.dimension === "both") return canScroll.x && canScroll.y;
	if (props.dimension === "either") return canScroll.x || canScroll.y;
});
</script>

<template>
	<template v-if="show !== props.invert">
		<slot/>
	</template>
</template>
