<script setup lang="ts">
import useTheme from "@/providers/ThemeProvider/useTheme.ts";
import RwWindow from "@/components/Window/RwWindow.vue";
import type {Instance} from "@/providers/AppManProvider/AppManProvider.vue";

type Props = { target: string | undefined, instance: Instance };
withDefaults(defineProps<Props>(), { target: undefined });

const {interface: {getThemesInfo, setCurrentTheme, getCurrentThemeInfo}} = useTheme();
const themes = getThemesInfo();
const currentTheme = getCurrentThemeInfo();

const pick = (e: MouseEvent) => {
	setCurrentTheme((e.target as HTMLInputElement).value);
};
</script>

<template>
	<RwWindow :width="400" :height="300" :x="100" :y="100" v-bind="{...instance.data.winMan}">
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
	</RwWindow>
</template>
