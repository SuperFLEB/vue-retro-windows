<script setup lang="ts">
import type {CSSProperties} from "vue";

type Props = { style?: CSSProperties };
const props = defineProps<Props>();
</script>

<template>
	<div class="desktop" :style="props.style ?? {}">
		<slot/>
	</div>
</template>
<style scoped lang="scss">
@use "../_html.scss" as h;

.desktop {
	/* These get overridden in the style tag in the ThreePointWinClassic variant theme. */
	--highlightColor: #108;
	--winUIFontSize: 16px;
	--titleHeight: 1.8em;
	--winUIFont: "MS Sans Serif", Arial, Helvetica, sans-serif;

	position: relative;
	flex-grow: 1;
	inset: 0;
	background-color: #048;

	&:deep() {
		@include h.themed;
	}
}
</style>