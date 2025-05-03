<script setup lang="ts">
import WindowDriver from "@/components/Window/WindowDriver.vue";
import WindowProvider from "@/providers/WindowProvider/WindowProvider.vue";
import useWindowManager from "@/providers/AppManagerProvider/useWindowManager.ts";
import type {PartialWindowInstanceWithWinId, WindowInstance} from "@t/RwEnvironment.ts";
import useAppInstance, {canUseAppInstance} from "@/providers/AppInstanceProvider/useAppInstance.ts";
import type {WinUid} from "@t/WinMan.ts";

/**
 * This is the outer window component that ingests initial props and creates a WindowProvider context.
 * The inner component, WindowDriver, actually draws the window.
 */

type Props = PartialWindowInstanceWithWinId;
const props = withDefaults(defineProps<Props>(), {});
const propsFiltered = Object.fromEntries(Object.entries(props).filter(([_, p]) => p !== undefined));

const appInstanceInterface = canUseAppInstance() ? useAppInstance().interface : undefined;
const windowManagerInterface = useWindowManager().interface;

let uid: WinUid | undefined = undefined;
if (appInstanceInterface) {
	uid = appInstanceInterface.getWindowUid(props.winId);
}

if (uid === undefined) {
	uid = windowManagerInterface.register(propsFiltered).uid;
	appInstanceInterface?.registerWindowUid(props.winId, uid);
}

</script>

<template>
	<WindowProvider :uid="uid">
		<WindowDriver>
			<template #subWindows>
				<slot name="subWindows"/>
			</template>
			<slot/>
		</WindowDriver>
	</WindowProvider>
</template>
