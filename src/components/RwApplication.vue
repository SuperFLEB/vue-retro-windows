<script setup lang="ts">
import RwDesktop from "@/components/RwDesktop.vue";
import type {ThemeSpec} from "@t/Theme";
import ThemeProvider from "@/providers/ThemeProvider/ThemeProvider.vue";
import WinManProvider from "@/providers/WinManProvider/WinManProvider.vue";
import "@/debug/index.ts";
import ThemeCollectionProvider from "@/providers/ThemeCollectionProvider/ThemeCollectionProvider.vue";
import builtInThemes, {type BuiltInThemes} from "@themes/index.ts";
import {computed} from "vue";
import AppManProvider from "@/providers/AppManProvider/AppManProvider.vue";
import type {ApplicationDefinition} from "@t/Application.js";
import AppManRenderer from "@/providers/AppManProvider/AppManRenderer.vue";

type Props = {
	themes?: ThemeSpec[],
	theme: BuiltInThemes | string,
	appId?: string,
	apps?: ApplicationDefinition[]
};
const props = withDefaults(defineProps<Props>(), {
	themes: undefined,
	appId: "main",
	apps: () => []
});
const themes = computed(() => props.themes ?? builtInThemes);
</script>
<template>
	<AppManProvider :apps>
		<ThemeCollectionProvider :themes :defaultTheme="theme">
			<ThemeProvider :root="true">
				<WinManProvider :appId>
					<RwDesktop>
						<slot/>
						<AppManRenderer />
					</RwDesktop>
				</WinManProvider>
			</ThemeProvider>
		</ThemeCollectionProvider>
	</AppManProvider>
</template>
