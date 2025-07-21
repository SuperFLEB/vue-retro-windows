<script setup lang="ts">

import ResizeHandle from "@/components/ResizeHandles/ResizeHandle.vue";
</script>

<template>
	<div class="scrollBarCorner">
		<ResizeHandle corner="se" class="handle">⧉</ResizeHandle>
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