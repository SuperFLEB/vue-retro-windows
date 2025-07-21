<script setup lang="ts">
import WindowDriver from "@/components/Window/WindowDriver.vue";
import WindowProvider from "@/providers/WindowProvider/WindowProvider.vue";
import useWindowManager from "@/providers/AppManagerProvider/useWindowManager.ts";
import useAppInstance, {canUseAppInstance} from "@/providers/AppInstanceProvider/useAppInstance.ts";
import type {WinUid} from "@t/WinMan.ts";
import {mutableWindowProps, type PartialWindowInstanceWithWinId} from "@t/WindowInstance.ts";
import pick from "@/util/pick.ts";
import {watch} from "vue";
import {canUseWindow, useWindow} from "@/providers/WindowProvider/useWindow.ts";
import useTheme from "@/providers/ThemeProvider/useTheme.ts";

/**
 * This is the outer window component that ingests initial props and creates a WindowProvider context.
 * The inner component, WindowDriver, actually draws the window.
 */

type Props = PartialWindowInstanceWithWinId;
const props = withDefaults(defineProps<Props>(), {state: "NORMAL", initFocused: true});
const propsFiltered = Object.fromEntries(Object.entries(props).filter(([_, p]) => p !== undefined));

const appInstanceInterface = canUseAppInstance() ? useAppInstance().interface : undefined;
const windowManagerInterface = useWindowManager().interface;
const themeRef = useTheme().themeRef;

let uid: WinUid | undefined = props.uid ?? undefined;

if (appInstanceInterface && uid === undefined) {
	uid = appInstanceInterface.getWindowUid(props.winId);
}

if (uid === undefined || !windowManagerInterface.get(uid)) {
	const parentUid = canUseWindow() ? useWindow().interface.getUid() : undefined;
	uid = windowManagerInterface.register(propsFiltered, parentUid).uid;
}

appInstanceInterface?.registerWindowUid(props.winId, uid);

watch(props, () => {
	const changes = pick(props, mutableWindowProps);
	if (Object.keys(changes).length) {
		windowManagerInterface.update({
			uid,
			...changes,
		});
	}
});
</script>

<template>
	<WindowProvider :uid="uid">
		<slot v-if="!themeRef.mdiSubWindows" name="subwindows" />
		<WindowDriver :initFocused>
			<slot/>
			<slot v-if="themeRef.mdiSubWindows" name="subwindows" />
		</WindowDriver>
	</WindowProvider>
</template>
