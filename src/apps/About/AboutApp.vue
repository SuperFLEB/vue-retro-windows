<script setup lang="ts">
import ThemedComponent from "@/ThemedComponent/ThemedComponent.vue";
import useTheme from "@/providers/ThemeProvider/useTheme.ts";
import RwWindow from "@/components/Window/RwWindow.vue";
import {ref} from "vue";

const {interface: themeInterface} = useTheme();
const themes = themeInterface.getThemesInfo();
const themeKeyName = ref(themeInterface.getCurrentTheme().keyName);

function switchTheme(keyName: string) {
	themeInterface.setCurrentTheme(keyName);
	themeKeyName.value = keyName;
}
</script>

<template>
	<RwWindow :width="800" :height="700" :x="50" :y="50" title="About RetroWin" winId="main">
		<div class="aboutContent">
			<h1>SuperFLEB RetroWin for Vue</h1>
			<p>Originally developed by <a href="https://github.com/SuperFLEB">FLEB (a.k.a. SuperFLEB)</a></p>
		</div>

		<template #subwindows>
			<RwWindow v-for="(theme, index) in themes" :key="theme.keyName" :width="700" :height="300"
					  :x="index * 40" :y="100 + index * 40" :title="`Theme - ${theme.displayName}`"
					  :winId="`about:${theme.keyName}`">
				<h1>{{ theme.displayName }}</h1>
				<p>
					<em v-if="theme.keyName === themeKeyName">This theme is currently active.</em>
					<button v-else type="button" @click="switchTheme(theme.keyName)">Try {{ theme.displayName }}
					</button>
				</p>
				<ThemedComponent is="AboutTheme" :theme="theme.keyName" :themeName="theme.keyName"/>
			</RwWindow>
		</template>
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