<script setup lang="ts">
import Themed from "@/providers/ThemeProvider/Themed.vue";
</script>
<script lang="ts">
export default {
	name: 'RwVisualMangler(Wrapper)'
}
</script>
<template>
<Themed is="RwVisualMangler"><slot /></Themed>
</template>
