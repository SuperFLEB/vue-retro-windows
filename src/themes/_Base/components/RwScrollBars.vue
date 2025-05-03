<script setup lang="ts">
import IfScroll from "@/components/ScrollBar/IfScroll.vue";
import Themed from "@/themed/Themed.vue";
</script>

<template>
	<IfScroll dimension="either">
		<Themed is="RwScrollBarX" class="scrollContainerX" dimension="x"/>
		<Themed is="RwScrollBarY" class="scrollContainerY" dimension="y"/>
	</IfScroll>
	<IfScroll dimension="both">
		<Themed is="RwScrollBarCorner" />
	</IfScroll>
</template>
