<script setup lang="ts">
import provideAppManager from "@/providers/AppManagerProvider/provideAppManager.ts";
import provideWindowManager from "@/providers/AppManagerProvider/provideWindowManager.ts";
import k from "@/providers/AppManagerProvider/keys.ts";
import {provide} from "vue";


const appManager = provideAppManager();
const windowManager = provideWindowManager();
appManager.connectWinManager(windowManager);
windowManager.connectAppManager(appManager);

export type AppManagerInterface = typeof appManager.interface;
export type AppManagerRegistry = typeof appManager.registry;
export type AppManagerProvides = { interface: AppManagerInterface, registry: AppManagerRegistry };
export type WindowManagerInterface = typeof windowManager.interface;
export type WindowManagerRegistry = typeof windowManager.registry;
export type WindowManagerProvides = { interface: WindowManagerInterface, registry: WindowManagerRegistry };

provide(k.INTERFACE_AM, appManager.interface);
provide(k.REGISTRY_AM, appManager.registry);
provide(k.INTERFACE_WM, windowManager.interface);
provide(k.REGISTRY_WM, windowManager.registry);
</script>

<template>
<slot />
</template>
