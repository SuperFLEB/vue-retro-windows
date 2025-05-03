<script setup lang="ts">
import useAppManager from "@/providers/AppManagerProvider/useAppManager.ts";
import useWindowManager from "@/providers/AppManagerProvider/useWindowManager.ts";
import k from "./keys.ts";
import type {AppInstance, Pid, WindowInstance} from "@t/RwEnvironment.ts";
import {provide} from "vue";
import type {WinId, WinUid} from "@t/WinMan.ts";

type Props = { pid: Pid };
const props = withDefaults(defineProps<Props>(), {});

// Freeze the pid because we can't have it changing on the fly
const pid = props.pid;

const { interface: appManagerInterface } = useAppManager();

const intf = Object.freeze({
	get(): AppInstance {
		return appManagerInterface.get(pid);
	},
	getWindowUid(winId: WinId): WinUid | undefined {
		return appManagerInterface.getWindowUid(pid, winId);
	},
	registerWindowUid(winId: WinId, uid: WinUid) {
		appManagerInterface.registerWindow(pid, winId, uid);
	}
});
export type AppInstanceInterface = typeof intf;

provide(k.INTERFACE, intf);
</script>

<template>
<slot />
</template>

<style scoped>

</style>