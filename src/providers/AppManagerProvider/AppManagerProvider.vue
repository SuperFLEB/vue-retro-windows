<script setup lang="ts">
import provideAppManager from "@/providers/AppManagerProvider/provideAppManager.ts";
import provideWindowManager from "@/providers/AppManagerProvider/provideWindowManager.ts";
import k from "@/providers/AppManagerProvider/keys.ts";
import {onMounted, provide} from "vue";
import type {ApplicationDefinition} from "@t/Application.ts";

type Props = { autoLaunchApps: ApplicationDefinition[] };
const props = withDefaults(defineProps<Props>(), { autoLaunchApps: () => [] });

const appManager = provideAppManager();
const windowManager = provideWindowManager();
appManager.connectWinManager(windowManager);
windowManager.connectAppManager(appManager);

export type AppManagerInterface = typeof appManager.interface;
export type AppManagerRegistry = typeof appManager.registry;
export type AppManagerProvides = { interface: AppManagerInterface, registry: AppManagerRegistry };
export type WindowManagerInterface = typeof windowManager.interface;
export type BindWindowManagerInterface = typeof windowManager.bindInterface;
export type WindowManagerRegistry = typeof windowManager.registry;
export type WindowManagerProvides = { interface: WindowManagerInterface, registry: WindowManagerRegistry };

provide(k.INTERFACE_AM, appManager.interface);
provide(k.REGISTRY_AM, appManager.registry);
provide(k.INTERFACE_WM, windowManager.interface);
provide(k.REGISTRY_WM, windowManager.registry);
provide(k.BIND_INTERFACE_WM, windowManager.bindInterface);

onMounted(() => {
	props.autoLaunchApps.forEach((app: ApplicationDefinition) => {
		appManager.interface.launch(app.id, 0);
	});
})
</script>

<template>
<slot />
</template>
