<script setup lang="ts">
import Themed from "@/providers/ThemeProvider/Themed.vue";
</script>
<template>
	<Themed is="RwScrollBarX" class="scrollContainerX" dimension="x"/>
	<Themed is="RwScrollBarY" class="scrollContainerY" dimension="y"/>
	<Themed is="RwScrollBarCorner" />
</template>
