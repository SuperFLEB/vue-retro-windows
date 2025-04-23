<script setup lang="ts">
import SvgFilter from "../assets/bw-halftone.svg.vue";
</script>

<template>
	<div class="filters"><SvgFilter /></div>
	<div :="$attrs" class="mangle">
		<slot/>
	</div>
</template>

<style scoped>
.filters {
	position: absolute;
	top: -999em;
	left: -999em;
}
.mangle, .grad {
	filter: url(#bwHalftoneFilter);
}
</style>