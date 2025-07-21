<script setup lang="ts">
import {provide} from "vue";
import useWindowManager from "@/providers/AppManagerProvider/useWindowManager.ts";
import {Win as w} from "./keys.ts";
import type {WinUid} from "@t/WinMan.ts";
import type {WindowInstance} from "@t/WindowInstance.ts";

type Props = { uid: WinUid };
const props = defineProps<Props>();

const {interface: windowManagerInterface, bindInterface} = useWindowManager();

const intf = Object.freeze({
	getUid(): WinUid {
		return props.uid;
	},
	...bindInterface(props.uid)
});

export type WindowInterface = typeof intf;
const instance = windowManagerInterface.get(props.uid, true);

provide<WindowInterface>(w.INTERFACE, intf);
provide<WindowInstance>(w.INSTANCE, instance);
</script>

<template>
	<slot/>
</template>
