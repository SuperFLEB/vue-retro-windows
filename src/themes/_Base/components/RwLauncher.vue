<script setup lang="ts">
import RwLauncher from "@/components/Launcher/RwLauncher.vue";
</script>
<template>
	<RwLauncher :="$attrs">
		<slot/>
	</RwLauncher>
</template>
