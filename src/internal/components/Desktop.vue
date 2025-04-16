<script setup lang="ts">
import Themed from "@int/components/ThemeProvider/Themed.vue";
</script>
<template>
	<Themed is="Desktop" :="{...$props, ...$attrs}"><slot/></Themed>
</template>
