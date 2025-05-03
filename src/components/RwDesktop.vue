<script setup lang="ts">
import Themed from "@/themed/Themed.vue";
</script>
<script lang="ts">
export default {
	name: 'AppDesktop(Wrapper)'
}
</script>
<template>
	<Themed is="RwDesktop" :="{...$props, ...$attrs}"><slot/></Themed>
</template>
