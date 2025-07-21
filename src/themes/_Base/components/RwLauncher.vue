<script setup lang="ts">
import RwLauncher from "@/components/Launcher/RwLauncher.vue";
import type {ApplicationDefinition} from "@t/Application.ts";
const props = defineProps<{ launch: string | ApplicationDefinition | (() => void), attachment?: string, label?: string }>();
</script>
<template>
	<RwLauncher v-bind="{...props}" :="$attrs">
		<slot/>
	</RwLauncher>
</template>
