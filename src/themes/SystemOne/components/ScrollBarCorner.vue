<script setup lang="ts">

import Handle from "@/components/ResizeHandles/Handle.vue";
</script>

<template>
<div class="scrollBarCorner">
	<Handle corner="se" class="handle" />
</div>
</template>

<style scoped>
.handle {
	position: absolute;
	inset: 0;
	background-color: transparent;
	cursor: se-resize;
}

.scrollBarCorner {
	position: relative;
	background-color: #fff;
	background-image: url("../assets/ui.svg#resize");
	background-repeat: no-repeat;
	background-position: bottom 3px right 3px;
	background-size: 18px;
}
</style>