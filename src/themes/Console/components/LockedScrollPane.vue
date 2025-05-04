<script setup lang="ts">
import {onMounted, useTemplateRef, watch} from "vue";
import {useScrollableElement} from "@/components/ScrollBar/useScrollableElement.ts";
import {isRefSet} from "@/util.ts";
import useScroll from "@/components/ScrollBar/useScroll.ts";
import {charGrid} from "../constants.ts";
import clamp from "@/util/clamp.ts";
import floatEq from "@/util/floatEq.ts";

const paneDom = useTemplateRef("pane");
const calipersDom = useTemplateRef("calipers");

const {state: scrollState, interface: scrollInterface} = useScroll();

watch(scrollState.value, () => {
	const currentX = scrollState.value.x.pxStart;
	const currentY = scrollState.value.y.pxStart;

	const clampedX = clamp(Math.round( currentX / charGrid.x) * charGrid.x, 0, scrollState.value.x.pxMax);
	const clampedY = clamp(Math.round(currentY / charGrid.y) * charGrid.y, 0, scrollState.value.y.pxMax);

	if (!floatEq(currentX, clampedX, 1) || !floatEq(currentY, clampedY, 1) ) {
		scrollInterface.scrollToPx({
			x: clampedX,
			y: clampedY,
		});
	}
}, {immediate: true});

onMounted(() => {
	if (!isRefSet(paneDom)) {
		console.warn("WindowPane mounted without a content element. Scrolling may be inoperative.");
		return;
	}
	useScrollableElement(paneDom, calipersDom);
});
</script>

<template>
	<div :class="['pane', 'themedScroll']" ref="pane">
		<div class="calipers" ref="calipers">
			<slot/>
		</div>
	</div>
</template>

<style scoped>
.pane {
	position: absolute;
	inset: 0;
	overflow: auto;
	scrollbar-width: none;
}
</style>