<script setup lang="ts">
import ThemedComponent from "@/ThemedComponent/ThemedComponent.vue";
</script>
<script lang="ts">
export default {
	name: 'AppDesktop(Wrapper)'
}
</script>
<template>
	<ThemedComponent is="RwDesktop" :="{...$props, ...$attrs}"><slot/></ThemedComponent>
</template>
