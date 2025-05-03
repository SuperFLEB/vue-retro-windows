<script setup lang="ts">
import RwDesktop from "@/components/RwDesktop.vue";
import type {ThemeSpec} from "@t/Theme.js";
import ThemeProvider from "@/providers/ThemeProvider/ThemeProvider.vue";
import "@/debug/index.ts";
import ThemeCollectionProvider from "@/providers/ThemeCollectionProvider/ThemeCollectionProvider.vue";
import builtInThemes, {type BuiltInThemes} from "@themes/index.ts";
import {computed} from "vue";
import type {ApplicationDefinition} from "@t/Application.js";
import AppManagerRenderer from "@/components/AppManagerRenderer.vue";
import ApplicationCollectionProvider from "@/providers/ApplicationCollectionProvider/ApplicationCollectionProvider.vue";
import AppManagerProvider from "@/providers/AppManagerProvider/AppManagerProvider.vue";

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
	<ApplicationCollectionProvider :apps>
		<AppManagerProvider>
			<ThemeCollectionProvider :themes :defaultTheme="theme">
				<ThemeProvider :root="true">
					<RwDesktop>
						<slot/>
						<AppManagerRenderer/>
					</RwDesktop>
				</ThemeProvider>
			</ThemeCollectionProvider>
		</AppManagerProvider>
	</ApplicationCollectionProvider>
</template>
