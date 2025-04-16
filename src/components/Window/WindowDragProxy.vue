<script setup lang="ts">

</script>

<template>
	<div class="dragProxy" />
</template>

<style scoped>
	.dragProxy {
		position: absolute;
		z-index: 100;
		border: 1px solid #fff;
		mix-blend-mode: difference;
	}
</style>