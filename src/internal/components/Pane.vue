<script setup lang="ts">
import Themed from "@int/components/ThemeProvider/Themed.vue";
</script>
<template>
	<Themed is="Pane" :class="['pane']"><slot /></Themed>
</template>
