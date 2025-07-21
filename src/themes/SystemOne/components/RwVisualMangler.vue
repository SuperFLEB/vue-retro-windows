<script setup lang="ts">
import BwHalftoneSvg from "../assets/BwHalftone.svg.vue";
</script>

<template>
	<div class="filters"><BwHalftoneSvg /></div>
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