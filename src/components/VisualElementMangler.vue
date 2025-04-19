<script setup lang="ts">
import Themed from "@/components/ThemeProvider/Themed.vue";
</script>
<script lang="ts">
export default {
	name: 'VisualElementMangler(Wrapper)'
}
</script>
<template>
<Themed is="VisualElementMangler"><slot /></Themed>
</template>
