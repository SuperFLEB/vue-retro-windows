<script setup lang="ts">
import Themed from "@/components/ThemeProvider/Themed.vue";
</script>
<template>
	<Themed is="Pane" :class="['pane']"><slot /></Themed>
</template>
