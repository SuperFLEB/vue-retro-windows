<script setup lang="ts">
import Themed from "@/components/ThemeProvider/Themed.vue";
</script>
<script lang="ts">
export default {
	name: 'Desktop(Wrapper)'
}
</script>
<template>
	<Themed is="Desktop" :="{...$props, ...$attrs}"><slot/></Themed>
</template>
