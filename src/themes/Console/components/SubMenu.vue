<script setup lang="ts">
import {onMounted, onUnmounted, useTemplateRef} from "vue";
import {charGrid} from "../constants.ts";

let intObs: IntersectionObserver | null;
const subMenuRef = useTemplateRef("subMenu");

const outerMargin = [1, 0];

function update(entries: IntersectionObserverEntry[]) {
	const lastEntry = entries.pop();
	if (!lastEntry) return;
	if (lastEntry.boundingClientRect.width && lastEntry.boundingClientRect.height) {
		const frameSize = [
			Math.ceil(lastEntry.boundingClientRect.width / charGrid.x) - outerMargin[0] * 2,
			Math.ceil(lastEntry.boundingClientRect.height / charGrid.y) - outerMargin[1] * 2
		];

		if (frameSize[0] < 3 || frameSize[1] < 3) return;

		const frame =
			 " \n".repeat(outerMargin[1]) +
			 " ".repeat(outerMargin[0]) + "┌" + "─".repeat(frameSize[0] - 2) + "┐\n" +
			(" ".repeat(outerMargin[0]) + "│" + " ".repeat(frameSize[0] - 2) + "│\n").repeat(frameSize[1] - 2 - outerMargin[1]) +
			 " ".repeat(outerMargin[0]) + "└" + "─".repeat(frameSize[0] - 2) + "┘";
		subMenuRef.value!.setAttribute("data-frame", frame);
	}
}

onMounted(() => {
	intObs = new IntersectionObserver(update, {
		root: null,
		rootMargin: "0px",
		threshold: 0.0,
	});
	intObs.observe(subMenuRef.value!);
});

onUnmounted(() => {
	if (intObs) {
		intObs.disconnect();
		intObs = null;
	}
})
</script>

<template>
<ol data-frame="" ref="subMenu">
	<slot />
</ol>
</template>
