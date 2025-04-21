<script setup lang="ts">

import Handle from "@/components/ResizeHandles/Handle.vue";
</script>

<template>
	<div class="scrollBarCorner">
		<Handle corner="se" class="handle">⧉</Handle>
	</div>
</template>

<style scoped>
.handle {
	font: 20px / 20px "SystemOneUI";
	padding: 3px;
	cursor: se-resize;
}

.scrollBarCorner {
	position: relative;
	background-color: #fff;
	color: #000;
}
</style>