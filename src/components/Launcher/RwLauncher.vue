<script setup lang="ts">
import type {ApplicationDefinition, ApplicationId} from "@t/Application.js";
import useLauncher from "@/components/Launcher/useLauncher.ts";
import {computed} from "vue";

type Props = { app: ApplicationDefinition | ApplicationId, attachment?: string, label?: string };
const props = withDefaults(defineProps<Props>(), {attachment: undefined, label: undefined });

const launcher = computed(() => useLauncher(props));
</script>

<template>
	<div class="launcher" @dblclick="launcher.launchFunction" tabindex="0">
		<div class="icon">
			<component :is="launcher.IconComponent" :attachment="props.attachment" :size="{x: 48, y: 48}" launcher="instance" />
		</div>
		<div class="label">{{ launcher.label }}</div>
	</div>
</template>

<style scoped>
.launcher {
	display: inline-block;
	width: 64px;
	text-align: center;

	.label {
		color: currentColor;
		display: inline-block;
		padding: 2px;
	}

	&:focus-within {
		.label {
			color: #000;
			background: #0cc;
		}
	}
}
</style>