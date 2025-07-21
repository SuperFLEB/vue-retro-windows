<script setup lang="ts">
import makeBackgroundTile from "@themes/Console/components/RwDesktop/makeBackgroundTile.ts";
import CaretController from "@superfleb/caret";
import {computed, onMounted, onUnmounted, ref, useTemplateRef} from "vue";
import BlockCursor from "./BlockCursor/BlockCursor.vue";
import dos437Unicode from "../assets/DOS437Unicode.ts";
import MenuProvider from "@/components/Menu/MenuProvider.vue";
import MenuBar from "@/components/Menu/MenuBar.vue";
import useThemeMenu from "@/composables/useThemeMenu.ts";
import type {MenuItemSpec} from "@/components/Menu/types.ts";

const tile = ref<string>();
const desktopRef = useTemplateRef("desktop");

const style = computed(() => {
	return ({
		backgroundImage: tile.value ? `url(${tile.value})` : undefined,
	});
});

const caretController = new CaretController();

onMounted(() => {
	dos437Unicode.load().then((_ => {
		const fontspec = getComputedStyle(desktopRef.value!).font;
		tile.value = makeBackgroundTile({fontspec, color: "#ccc"});
	}));
	caretController.mount(desktopRef.value!);
});

onUnmounted(() => {
	caretController.unmount();
});

const themeMenu = useThemeMenu();
const baseMenu: MenuItemSpec = {
	name: "root",
	sub: [{
		...themeMenu,
		display: "Themes",
	} as MenuItemSpec]
};

</script>

<template>
	<MenuProvider :useNearestWindow="false" :baseMenu="baseMenu">
		<div :class="['screen', $style.screen]">
			<div class="desktopMenuBar">
				<MenuBar/>
			</div>
			<div class="desktop" :style="style" ref="desktop">
				<BlockCursor/>
				<slot/>
			</div>
		</div>
	</MenuProvider>
</template>

<style scoped lang="scss" src="./MenuBar.scss"/>
<style module lang="scss">
@use "../_html.scss" as s;

:where(.screen) {
	@include s.themed;
}
</style>
<style scoped lang="scss">
$font-size: 14px;
$font-family: "DOS437Unicode";
$grid-x: $font-size;
$grid-y: $font-size * 2;

@use "../_font.scss" as f;
@use "../_html.scss" as s;
@use "../_pcColor.scss" as pc;

@keyframes blink {
	0% {
		opacity: 0;
	}
	50% {
		opacity: 100%;
	}
}

.screen {
	display: flex;
	flex-direction: column;
	position: absolute;
	inset: 0;

	font: #{f.$font-size}/#{2 * f.$font-size} f.$font-family;
	color: pc.$white;
	background-color: pc.$blue;

	.desktop {
		flex-grow: 1;
		position: relative;
	}

	&:deep() {
		.caretTrackerCustomCaret {
			background: linear-gradient(to top, currentColor, currentColor 20%, transparent 20%, transparent);
			animation: blink 0.25s step-end infinite;
		}
	}
}
</style>