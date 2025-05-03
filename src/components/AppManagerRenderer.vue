<script setup lang="ts">
import {computed} from "vue";
import Itermore from "@/util/Itermore.ts";
import useAppManager from "@/providers/AppManagerProvider/useAppManager.ts";
import useApplicationCollection from "@/providers/ApplicationCollectionProvider/useApplicationCollection.ts";
import type {AppInstance} from "@t/RwEnvironment.ts";
import AppInstanceProvider from "@/providers/AppInstanceProvider/AppInstanceProvider.vue";

const {registry} = useAppManager();
const {interface: appsInterface} = useApplicationCollection();
const activeApps = computed(() =>
	new Itermore<AppInstance>(registry.value.values())
		.filter(app => !app.terminated)
		.map(app => ({
			pid: app.pid,
			def: appsInterface.getApplicationDefinition(app.appId)
		}))
		.toArray()
);
</script>
<template>
	<AppInstanceProvider v-for="app in activeApps" :key="app.pid" :pid="app.pid">
		<component :is="app.def.component" />
	</AppInstanceProvider>
</template>
