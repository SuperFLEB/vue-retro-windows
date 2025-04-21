<script setup lang="ts">
import useTheme from "@/providers/ThemeProvider/useTheme.ts";

const {interface: {getThemesInfo, setCurrentTheme, getCurrentThemeInfo}} = useTheme();
const themes = getThemesInfo();
const currentTheme = getCurrentThemeInfo();

const pick = (e: MouseEvent) => {
	setCurrentTheme((e.target as HTMLInputElement).value);
};
</script>

<template>
	<div>
		<fieldset>
			<legend>Themes</legend>
			<template v-for="thisTheme in themes">
				<label style="display: block">
					<input type="radio" name="theme" :value="thisTheme.keyName"
						   :checked="currentTheme.keyName === thisTheme.keyName" @click="pick"/>
					<span v-if="thisTheme.debugModeOnly" title="Debug-mode only theme">🐞</span>
					{{ thisTheme.displayName }}
				</label>
			</template>
		</fieldset>
		<!-- button type="button">Full Screen</button -->
	</div>
</template>
