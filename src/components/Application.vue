<script setup lang="ts">
import Desktop from "@int/components/Desktop.vue";
import type {ThemeSpec} from "@t/Theme";
import ThemeProvider from "@int/components/ThemeProvider/ThemeProvider.vue";
import WinManProvider from "@int/components/WindowManagementProvider/WinManProvider.vue";
import "@int/debug/index.ts";
import ApplicationThemesProvider from "@int/components/ApplicationThemesProvider/ApplicationThemesProvider.vue";
import builtInThemes, {type BuiltInThemes} from "@themes/index.ts";
import {computed} from "vue";

type Props = { themes?: ThemeSpec[], theme: BuiltInThemes | string };
const props = withDefaults(defineProps<Props>(), { themes: undefined });
const themes = computed(() => props.themes ?? builtInThemes);

</script>
<template>
	<ApplicationThemesProvider :themes :defaultTheme="theme">
		<ThemeProvider :root="true">
			<WinManProvider>
				<Desktop>
					<slot/>
				</Desktop>
			</WinManProvider>
		</ThemeProvider>
	</ApplicationThemesProvider>
</template>
