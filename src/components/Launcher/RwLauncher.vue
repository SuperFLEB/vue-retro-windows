<script setup lang="ts">
import type {ApplicationDefinition, ApplicationId} from "@t/Application.js";
import useAppMan from "@/providers/AppManProvider/useAppMan.js";

type Props = { app: ApplicationDefinition | ApplicationId, attachment?: string, label?: string };
const props = withDefaults(defineProps<Props>(), {attachment: undefined, label: undefined });

const {interface: appManIntf} = useAppMan();
const applicationId = typeof props.app === "object" ? appManIntf.resolveOrRegister(props.app) : props.app;
const Icon = appManIntf.getLauncherIcon(applicationId);
const label = props.label ?? appManIntf.getApplication(applicationId).displayName;

function launch() {
	appManIntf.launch(applicationId);
}
</script>

<template>
	<div class="launcher" @dblclick="launch" @click="" tabindex="0">
		<div class="icon">
			<Icon :attachment="props.attachment" :size="{x: 48, y: 48}" launcher="instance" />
		</div>
		<div class="label">{{ label }}</div>
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