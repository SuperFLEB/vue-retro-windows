<script setup lang="ts">
import useTheme from "@/providers/ThemeProvider/useTheme.ts";
import RwWindow from "@/components/Window/RwWindow.vue";

const {interface: {getThemesInfo, setCurrentTheme, getCurrentThemeInfo}} = useTheme();
const themes = getThemesInfo();
const currentTheme = getCurrentThemeInfo();

const pick = (e: MouseEvent) => {
	setCurrentTheme((e.target as HTMLInputElement).value);
};
</script>

<template>
	<RwWindow :width="400" :height="300" :x="100" :y="100" winId="main" title="Theme Picker">
		<div>
			<form @submit="$event.preventDefault()">
				<fieldset>
					<legend>Themes</legend>
					<template v-for="thisTheme in themes" :key="thisTheme.keyName">
						<label style="display: block">
							<input type="radio" name="theme" :value="thisTheme.keyName"
								   :checked="currentTheme.keyName === thisTheme.keyName" @click="pick"/>
							<span v-if="thisTheme.debugModeOnly" title="Debug-mode only theme">🐞</span>
							{{ thisTheme.displayName }}
						</label>
					</template>
				</fieldset>
			</form>
			<!-- button type="button">Full Screen</button -->
		</div>
	</RwWindow>
</template>
