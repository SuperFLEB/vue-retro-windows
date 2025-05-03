<script setup lang="ts">
import Themed from "@/themed/Themed.vue";
import useTheme from "@/providers/ThemeProvider/useTheme.ts";
import RwWindow from "@/components/Window/RwWindow.vue";
import type {Instance} from "@/providers/RetroWinProvider/RetroWinProvider.vue";

type Props = { target: string | undefined, instance: Instance };
withDefaults(defineProps<Props>(), { target: undefined });

const {interface: themeInterface} = useTheme();
const themes = themeInterface.getThemesInfo();
</script>

<template>
	<RwWindow :width="800" :height="400" :x="50" :y="50" v-bind="{...instance.data.winMan}">
		<div class="aboutContent">
			<h1>SuperFLEB RetroWin for Vue</h1>
			<p>Originally developed by <a href="https://github.com/SuperFLEB">FLEB (a.k.a. SuperFLEB)</a></p>

			<h2>Themes</h2>
			<template v-for="theme in themes">
				<h3>{{ theme.displayName }}</h3>
				<Themed is="AboutTheme" :theme="theme.keyName" :themeName="theme.keyName" />
			</template>
		</div>
	</RwWindow>
</template>

<style scoped lang="scss">
.aboutContent {
	padding: 2ch;

	&:deep() {
		.license {
			position: relative;
			z-index: 3;
			padding: calc(1lh - 2px);
			margin: 1lh 4ch 4ch 1lh;
			border: 2px solid #000;
			background-color: #fff;
			color: #000;
			box-shadow: 1lh 2ch #000;
		}
	}
}
</style>