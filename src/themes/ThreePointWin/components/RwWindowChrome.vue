<script setup lang="ts">
import {useWindow} from "@/providers/WindowProvider/useWindow.ts";
import ResizeHandleSet from "@/components/ResizeHandles/ResizeHandleSet.vue";
import ScrollProvider from "@/components/ScrollBar/ScrollProvider.vue";
import ScrollBars from "@/components/ScrollBar/ScrollBars.vue";
import MenuBar from "@/components/Menu/MenuBar.vue";
import MenuProvider from "@/components/Menu/MenuProvider.vue";
import {computed} from "vue";
import useWindowManager from "@/providers/AppManagerProvider/useWindowManager.ts";
import WindowBar from "@themes/ThreePointWin/components/WindowBar.vue";

const {instance: windowInstance} = useWindow();
const {interface: windowManagerInterface} = useWindowManager();

const maxedChild = computed(() => {
	const uid = windowInstance.childrenByState.MAXIMIZED.values().next().value;
	return uid === undefined ? undefined : windowManagerInterface.get(uid);
});

const showTitleBar = computed(() => !(windowInstance.state === "MAXIMIZED" && windowInstance.parentUid));
const canResize = computed(() => windowInstance.state === "NORMAL");
const canMove = computed(() => windowInstance.state === "NORMAL");

</script>

<template>
	<MenuProvider>
		<div :="$attrs" :class="['frame', { resizeable: canResize, focus: windowInstance.focus }]" :tabindex="-1"
			 @focusin="$emit('windowfocus', $event)"
			 @focusout="$emit('windowblur', $event)">
			<div class="innerFrame">
				<WindowBar v-if="showTitleBar" :windowInstance @movestart="canMove && $emit('movestart', $event)"/>
				<template v-if="maxedChild">
					<WindowBar :windowInstance="maxedChild">
						<div class="menuBar">
							<MenuBar />
						</div>
					</WindowBar>
				</template>
				<MenuBar v-else/>

				<ScrollProvider>
					<div class="main">
						<ScrollBars/>
						<div class="contentWrapper">
							<slot/>
						</div>
					</div>
				</ScrollProvider>
			</div>
			<template v-if="canResize">
				<ResizeHandleSet class="handles" :corners="['ne', 'nw', 'se', 'sw']"/>
			</template>
		</div>
	</MenuProvider>
</template>

<style scoped lang="scss" src="./MenuBar.scss"/>
<style scoped lang="scss">
@use "@/styles/WindowChromeBasic.scss";
@use "RwWindowChrome/WindowChrome.scss";

.menuBar {
	background-color: #fff;
}
</style>