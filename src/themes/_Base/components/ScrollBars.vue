<script setup lang="ts">
import IfScroll from "@int/components/ScrollBar/IfScroll.vue";
import Themed from "@int/components/ThemeProvider/Themed.vue";
</script>

<template>
	<IfScroll dimension="either">
		<Themed is="ScrollBarX" class="scrollContainerX" dimension="x"/>
		<Themed is="ScrollBarY" class="scrollContainerY" dimension="y"/>
	</IfScroll>
	<IfScroll dimension="both">
		<Themed is="ScrollBarCorner" />
	</IfScroll>
</template>
