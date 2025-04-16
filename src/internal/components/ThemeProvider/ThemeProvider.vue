<script setup lang="ts">
import keys from "./keys.ts";
import FailedComponent from "@int/components/FailedComponent.vue";
import FallbackTheme from "@themes/_Base/index.ts";
import {computed, type ComputedRef, provide, readonly, ref, shallowRef, useSlots, watch, watchEffect} from "vue";
import {debug, getDebugMode, nondebug} from "@int/debug/index.ts";

import type {
	CompleteThemeInfo,
	CompleteThemeSpec,
	ThemeComponents,
	ThemeEffects,
	ThemeEffectsList,
	ThemeInfo,
	ThemeSpec
} from "@t/Theme.ts";
import {composeTheme} from "@int/components/ThemeProvider/util.ts";
import {randomString} from "@int/util.ts";
import type {Like} from "@t/Like.ts";
import useApplicationThemes from "@int/components/ApplicationThemesProvider/useApplicationThemes.ts";

function strip(themeIn: ThemeSpec): ThemeInfo {
	const {components: _, ...themeOut} = themeIn;
	return themeOut;
}

type Props = { root?: boolean, themes?: ThemeSpec[], defaultTheme?: string, theme?: string };
const props = defineProps<Props>();

const emit = defineEmits<{
	(e: "themechange", name: string): void,
}>();

const { themesRef: applicationThemesRef, interface: applicationThemesIntf } = useApplicationThemes();
const themes = applicationThemesRef.value as Map<string, ThemeSpec>;
const themeInstanceId = ref<string>(randomString(20));

const localThemeName = ref<string|undefined>();
const currentTheme = shallowRef<CompleteThemeSpec>()!;

watchEffect(() => {
	const composed = composeTheme(applicationThemesIntf.get(localThemeName.value ?? props.theme ?? false), FallbackTheme as CompleteThemeSpec);
	currentTheme.value = composed;
});

function getThemesInfo(includeDebug = false): ThemeInfo[] {
	const withDebug = (includeDebug || getDebugMode());
	const themesOut = withDebug ? Array.from(themes.values()) : Array.from(themes.values()).filter((v) => !v.debugModeOnly);
	return themesOut.map<ThemeInfo>(t => strip(t));
}

const intf = Object.freeze({
	getCurrentTheme(): CompleteThemeSpec {
		return currentTheme.value;
	},
	getCurrentThemeInfo(): CompleteThemeInfo {
		return strip(intf.getCurrentTheme()) as CompleteThemeInfo;
	},
	getCurrentThemeEffects(): ThemeEffectsList {
		const themeInfo = intf.getCurrentThemeInfo();
		if (!themeInfo) return [];
		return Object.entries(themeInfo.effects).map(([name, val]) => val ? name as keyof ThemeEffects : null).filter(n => n !== null);
	},
	getThemeInstanceId(prefix: string = ""): string {
		return prefix + themeInstanceId.value;
	},
	setCurrentTheme(keyName: string): void {
		if (!themes.has(keyName)) {
			debug.error("setCurrentTheme attempt failed because the theme could not be found", {keyName, themes});
			nondebug.error("Error changing the theme to", keyName);
		}
		if (props.root) {
			applicationThemesIntf.setSavedTheme(keyName);
		}

		localThemeName.value = keyName;
		themeInstanceId.value = randomString(20);
		emit("themechange", keyName);
	},
	getThemesInfo(withDebug = false): ThemeInfo[] {
		return getThemesInfo(withDebug);
	},
	themedComponent<N extends keyof ThemeComponents>(componentName: N): ThemeComponents[N] | typeof FailedComponent {
		return currentTheme.value.components[componentName] ?? FailedComponent;
	}
} as const);

export type ThemeProviderInterface = Like<typeof intf>;

provide(keys.INTERFACE, intf);
provide(keys.IS_ROOT_THEME, props.root);
provide(keys.CURRENT_THEME_REF, readonly(currentTheme));

const multipleChildren = Boolean(useSlots().default?.()[1]);
const theme = intf.getCurrentThemeInfo();

if (multipleChildren) {
	console.warn("Theme provider has multiple root slot children. A wrapper DIV was created in order to set class information, but you should be doing this yourself.");
}
</script>

<template>
	<div v-if="multipleChildren" :class="['theme-definition-start', theme.uniqueClassName]">
		<slot></slot>
	</div>
	<slot v-else :class="['theme-definition-start', theme.uniqueClassName]"/>
</template>
