<script setup lang="ts">
import {computed, onMounted, useTemplateRef} from "vue";
import useTheme, {canUseTheme} from "@/providers/ThemeProvider/useTheme.ts";
import {useScrollableElement} from "@/components/ScrollBar/useScrollableElement.ts";
import {isRefSet} from "@/util.ts";

const paneRef = useTemplateRef("pane");
const calipersDom = useTemplateRef("calipers");
const themeRef = canUseTheme() ? useTheme().themeRef : null;
const nativeScroll = computed(() => {
	return themeRef ? themeRef.value.nativeScroll : true;
});

onMounted(() => {
	if (!isRefSet(paneRef)) {
		console.warn("WindowPane mounted without a content element. Scrolling may be inoperative.");
		return;
	}
	useScrollableElement(paneRef, calipersDom);
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