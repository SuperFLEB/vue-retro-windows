<script setup lang="ts">
import Desktop from "@/components/Desktop.vue";
import type {ThemeSpec} from "@t/Theme";
import ThemeProvider from "@/components/ThemeProvider/ThemeProvider.vue";
import WinManProvider from "@/components/WindowManagementProvider/WinManProvider.vue";
import "@/debug/index.ts";
import ApplicationThemesProvider from "@/components/ApplicationThemesProvider/ApplicationThemesProvider.vue";
import builtInThemes, {type BuiltInThemes} from "@/themes/index.ts";
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
