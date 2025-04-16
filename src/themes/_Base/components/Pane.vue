<script setup lang="ts">
import {computed, onMounted, useTemplateRef} from "vue";
import useTheme, {canUseTheme} from "@int/components/ThemeProvider/useTheme.ts";
import {useScrollableElement} from "@int/components/ScrollBar/useScrollableElement.ts";
import {isRefSet} from "@int/util.ts";

const paneDom = useTemplateRef("pane");
const calipersDom = useTemplateRef("calipers");
const themeRef = canUseTheme() ? useTheme().themeRef : null;
const nativeScroll = computed(() => {
	return themeRef ? themeRef.value.nativeScroll : true;
});

onMounted(() => {
	if (!isRefSet(paneDom)) {
		console.warn("Pane mounted without a content element. Scrolling may be inoperative.");
		return;
	}
	useScrollableElement(paneDom, calipersDom);
});

</script>

<template>
	<div :class="['pane', nativeScroll ? 'nativeScroll' : 'themedScroll']" ref="pane">
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

	&.themedScroll {
		scrollbar-width: none;
	}
}
</style>