<script setup lang="ts">
import IfScroll from "@/components/ScrollBar/IfScroll.vue";
import ThemedComponent from "@/ThemedComponent/ThemedComponent.vue";
</script>

<template>
	<IfScroll dimension="either">
		<ThemedComponent is="RwScrollBarX" class="scrollContainerX" dimension="x"/>
		<ThemedComponent is="RwScrollBarY" class="scrollContainerY" dimension="y"/>
	</IfScroll>
	<IfScroll dimension="both">
		<ThemedComponent is="RwScrollBarCorner" />
	</IfScroll>
</template>
