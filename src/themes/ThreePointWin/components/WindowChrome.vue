<script setup lang="ts">
import {useWindow} from "@int/components/WindowManagementProvider/useWindowManager.ts";
import HandleSet from "@int/components/ResizeHandles/HandleSet.vue";
import ScrollProvider from "@int/components/ScrollBar/ScrollProvider.vue";
import ScrollBars from "@int/components/ScrollBar/ScrollBars.vue";
import MenuBar from "@int/components/Menu/MenuBar.vue";
import MenuProvider from "@int/components/Menu/MenuProvider.vue";

const {props: windowProps} = useWindow();

const canMinimize = true;
const canResize = true;
const windowChromeSvgUrl = new URL("../assets/windowChrome.svg", import.meta.url).href;
</script>

<template>
	<MenuProvider>
		<div :="$attrs" :class="['frame', 'resizeable', {focus: windowProps.focus}]" :tabindex="-1" @focusin="$emit('windowfocus', $event)"
			 @focusout="$emit('windowblur', $event)">
			<div class="innerFrame">
				<div :tabIndex="-1" class="noTheme titleBar">
					<div class="title" @touchstart="$emit('movestart', $event)" @mousedown="$emit('movestart', $event)">{{ windowProps.title }}</div>
					<button
						type="button"
						class="windowButton contextMenuButton"
					>
						<img alt="Context Menu" :src="windowChromeSvgUrl + '#close'"/>
					</button>

					<template v-if="canMinimize">
						<button type="button" class="windowButton maximizeButton">
							<img alt="Minimize" :src="windowChromeSvgUrl + '#minimize'"/>
						</button>
						<button type="button" class="windowButton maxButton">
							<img alt="Maximize" :src="windowChromeSvgUrl + '#maximize'"/>
						</button>
					</template>
				</div>
				<MenuBar />
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
				<HandleSet class="handles" :corners="['ne', 'nw', 'se', 'sw']"/>
			</template>
		</div>
	</MenuProvider>
</template>

<style scoped lang="scss" src="./MenuBar.scss" />
<style scoped lang="scss">
@use "@int/styles/WindowChromeBasic.scss";
@use "WindowChrome/WindowChrome.scss";

// @use "WindowChrome.old/WindowChrome.old.scss";
</style>