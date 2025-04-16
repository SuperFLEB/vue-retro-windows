<script setup lang="ts">
/**
 * This is the outer window component that ingests initial props and creates a WindowProvider context.
 * The inner component, WindowDriver, actually draws the window.
 *
 * The naming is a bit weird-- This is basically just a way to shim a WindowProvider in front of every Window,
 * but it's just called Window because that's more intuitive from the outside.
 */

import WindowDriver from "@int/components/Window/WindowDriver.vue";
import WindowProvider from "@int/components/WindowManagementProvider/WindowProvider.vue";
import type {ValidPartialWindowProps} from "@t/WinMan.ts";
import {createWindowProps, defaultWindowProps} from "@int/components/Window/props.ts";
import {onMounted} from "vue";
import {useWindowManager} from "@int/components/WindowManagementProvider/useWindowManager.ts";
import {ComposableOutOfContextError} from "@int/errors.ts";

type Props = ValidPartialWindowProps;
const props = withDefaults(defineProps<Props>(), {
	...defaultWindowProps
});

const initialState = createWindowProps({...props});
const {interface: winMan} = useWindowManager();

if (!winMan) {
	throw new ComposableOutOfContextError("Window Manager Registry Interface not found. <Window> must be created within a WinManProvider.");
}

if (!props.winId) {
	throw new Error("<Window> created without winId");
}

onMounted(() => {
	winMan.register(props);
});
</script>

<template>
	<template v-if="winMan.has(props.winId)">
		<WindowProvider :winId="initialState.winId">
			<WindowDriver>
				<template #subWindows><slot name="subWindows" /></template>
				<slot/>
			</WindowDriver>
		</WindowProvider>
	</template>
</template>
