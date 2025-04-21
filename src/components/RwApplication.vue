<script setup lang="ts">
import RwDesktop from "@/components/RwDesktop.vue";
import type {ThemeSpec} from "@t/Theme";
import ThemeProvider from "@/providers/ThemeProvider/ThemeProvider.vue";
import WinManProvider from "@/providers/WinManProvider/WinManProvider.vue";
import "@/debug/index.ts";
import ThemeCollectionProvider from "@/providers/ThemeCollectionProvider/ThemeCollectionProvider.vue";
import builtInThemes, {type BuiltInThemes} from "@themes/index.ts";
import {computed} from "vue";

type Props = { themes?: ThemeSpec[], theme: BuiltInThemes | string };
const props = withDefaults(defineProps<Props>(), { themes: undefined });
const themes = computed(() => props.themes ?? builtInThemes);

</script>
<template>
	<ThemeCollectionProvider :themes :defaultTheme="theme">
		<ThemeProvider :root="true">
			<WinManProvider>
				<RwDesktop>
					<slot/>
				</RwDesktop>
			</WinManProvider>
		</ThemeProvider>
	</ThemeCollectionProvider>
</template>
