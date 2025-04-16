<script setup lang="ts">
import {onMounted, useTemplateRef, watch} from "vue";
import {useScrollableElement} from "@/components/ScrollBar/useScrollableElement.ts";
import {isRefSet} from "@/util.ts";
import useScroll from "@/components/ScrollBar/useScroll.ts";
import {charGrid} from "@/themes/Console/constants.ts";
import debug from "@/debug/index.ts";

const paneDom = useTemplateRef("pane");
const calipersDom = useTemplateRef("calipers");

const {state: scrollState, interface: scrollInterface} = useScroll();

watch(scrollState.value, () => {
	const charsX = scrollState.value.x.pxStart / charGrid.x;
	const charsY = scrollState.value.y.pxStart / charGrid.y;
	if (Math.abs(Math.round(charsX) - charsX) > .0001 || Math.abs(Math.round(charsY) - charsY) > .0001) {
		debug.log("Scroll state rounded", {charsX, charsY});
		scrollInterface.scrollToPx({
			x: Math.max(0, Math.round(charsX) * charGrid.x),
			y: Math.max(0, Math.round(charsY) * charGrid.y)
		});
	}
}, {immediate: true});

onMounted(() => {
	if (!isRefSet(paneDom)) {
		console.warn("Pane mounted without a content element. Scrolling may be inoperative.");
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