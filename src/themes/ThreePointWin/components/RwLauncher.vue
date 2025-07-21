<script setup lang="ts">
import RwLauncher from "@/components/Launcher/RwLauncher.vue";
import type {ApplicationDefinition} from "@t/Application.ts";
const props = defineProps<{ launch: string | ApplicationDefinition | (() => void), attachment?: string, label?: string }>();
</script>
<template>
	<RwLauncher class="win3Launcher" v-bind="props">
		<slot/>
	</RwLauncher>
</template>
<style scoped>
	.win3Launcher {
		font-family: System, Arial, sans-serif;
		font-size: 12px;
	}
</style>
