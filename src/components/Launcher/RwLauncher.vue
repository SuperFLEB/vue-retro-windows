<script setup lang="ts">
import type {ApplicationDefinition, ApplicationId} from "@t/Application.js";
import useAppManager from "@/providers/AppManagerProvider/useAppManager.js";
import useApplicationCollection from "@/providers/ApplicationCollectionProvider/useApplicationCollection.js";

type Props = { app: ApplicationDefinition | ApplicationId, attachment?: string, label?: string };
const props = withDefaults(defineProps<Props>(), {attachment: undefined, label: undefined });

const {interface: appManIntf} = useAppManager();
const {interface: appCollectionIntf} = useApplicationCollection();

const applicationId = typeof props.app === "object" ? appCollectionIntf.resolveOrRegister(props.app) : props.app;
const Icon = appCollectionIntf.getLauncherIcon(applicationId);
const label = props.label ?? appCollectionIntf.getApplicationDefinition(applicationId).displayName;

function launch() {
	appManIntf.launch(applicationId, 0);
}
</script>

<template>
	<div class="launcher" @dblclick="launch" tabindex="0">
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