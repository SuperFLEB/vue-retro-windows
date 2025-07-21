<script setup lang="ts">
import ThemedComponent from "@/ThemedComponent/ThemedComponent.vue";
</script>
<template>
	<ThemedComponent is="RwScrollBarX" class="scrollContainerX" dimension="x"/>
	<ThemedComponent is="RwScrollBarY" class="scrollContainerY" dimension="y"/>
	<ThemedComponent is="RwScrollBarCorner" />
</template>
