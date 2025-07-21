<script setup lang="ts">
import MenuBar from "@/components/Menu/MenuBar.vue";
import MenuProvider from "@/components/Menu/MenuProvider.vue";
import useThemeMenu from "@/composables/useThemeMenu.ts";
import {MenuTypes} from "@/components/Menu/MenuTypes.ts";
import type {MenuItemSpec} from "@/components/Menu/types.ts";

const themeMenu = useThemeMenu();

const baseMenu = {
	name: "root",
	sub: [
		{
			...themeMenu,
			display: "🍅",
			sub: [
				{ name: "Theme Selection", action: () => {} },
				{ type: MenuTypes.SEPARATOR },
				...(themeMenu.sub ?? []),
			]
		} as MenuItemSpec,
	]
};
</script>

<template>
	<MenuProvider :useNearestWindow="false" :baseMenu="baseMenu">
		<div class="screen">
			<div class="desktopMenuBar">
				<MenuBar/>
			</div>
			<div class="desktop">
				<slot/>
			</div>
		</div>
	</MenuProvider>
</template>

<style src="../assets/Pixelva.css"/>
<style scoped lang="scss" src="./MenuBar.scss"/>
<style scoped lang="scss">
@use "../_html.scss" as html;
.screen {
	position: relative;
	display: flex;
	flex-direction: column;
	flex-grow: 1;

	filter: grayscale(1) brightness(0.9) contrast(1.5);
	border-radius: 10px;

	font-family: Pixelva, Helvetica, Arial, sans-serif;
	overflow: hidden;

	&:deep() {
		@include html.themed;
	}
}

.desktop {
	flex-grow: 1;
	position: relative;

	overflow: hidden;

	background-color: #fff;
	background-image: url("@/assets/shades/2px-50.png");
	background-repeat: repeat;
	image-rendering: pixelated;
}

.desktop * {
	image-rendering: auto;
}

.desktopMenuBar {
	background-color: #fff;
	display: flex;
	flex-direction: row;
	font: 16px / 18px "ChicagoFLF", sans-serif;
	height: 1.5lh;
	border-bottom: 2px solid #000;
}
</style>