<script setup lang="ts">
import type {ApplicationDefinition, ApplicationId} from "@t/Application.js";
import useRetroWin from "@/providers/RetroWinProvider/useRetroWin.js";

type Props = { app: ApplicationDefinition | ApplicationId, attachment?: string, label?: string };
const props = withDefaults(defineProps<Props>(), {attachment: undefined, label: undefined });

const {interface: appManIntf} = useRetroWin();
const applicationId = typeof props.app === "object" ? appManIntf.resolveOrRegister(props.app) : props.app;
const label = props.label ?? appManIntf.getApplication(applicationId).displayName;

function launch() {
	appManIntf.launch(applicationId);
}
</script>

<template>
	<button class="launcherButton" @click="launch">{{ label }}</button>
</template>

<style scoped>
.launcherButton {
	margin: 1lh 0;
}
</style>