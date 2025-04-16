<script setup lang="ts">
import Themed from "@/components/ThemeProvider/Themed.vue";
</script>
<template>
	<Themed is="ScrollBarX" class="scrollContainerX" dimension="x"/>
	<Themed is="ScrollBarY" class="scrollContainerY" dimension="y"/>
	<Themed is="ScrollBarCorner" />
</template>
