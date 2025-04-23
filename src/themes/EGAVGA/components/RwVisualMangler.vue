<script setup lang="ts">
import SvgFilter from "../assets/color-halftone.svg.vue";
</script>

<template>
	<div class="mangle">
		<slot/>
	</div>
	<SvgFilter />
</template>

<style scoped>
.mangle {
	filter: url(#colorHalftoneFilter);
}
</style>