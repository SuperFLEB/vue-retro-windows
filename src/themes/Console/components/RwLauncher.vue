<script setup lang="ts">
import useLauncher from "@/components/Launcher/useLauncher.ts";
import type {ApplicationDefinition, ApplicationId} from "@t/Application.ts";
import {computed} from "vue";

type Props = { launch: ApplicationDefinition | ApplicationId, attachment?: string, label?: string };
const props = withDefaults(defineProps<Props>(), {attachment: undefined, label: undefined });

const launcher = computed(() => useLauncher(props));
</script>

<template>
	<button class="launcherButton" @click="launcher.launchFunction">{{ launcher.label }}</button>
</template>

<style scoped>
.launcherButton {
	margin: 1lh 0;
}
</style>