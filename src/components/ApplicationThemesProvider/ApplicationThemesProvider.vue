<script setup lang="ts">
import {type ThemesMap, ThemeSpec} from "@t/Theme";
import {provide, readonly, type Ref, ref, shallowRef, triggerRef} from "vue";
import k from "./keys";
import debug from "@/debug/index.ts";
import fallbackTheme from "@themes/_Base/index.ts";
import savedThemeKeyName from "@/components/ApplicationThemesProvider/savedThemeKeyName.ts";

// This needs to be a shallowRef because it comtains a deep structure including exported
// Be sure to triggerRef(_themes) whenever you modify the map;
const _themes = shallowRef<Map<string, ThemeSpec>>(new Map());
const themesRef = readonly(_themes);

type Props = { themes: ThemeSpec[], defaultTheme: string };
const props = defineProps<Props>();

const intf = {
	add(...newThemes: ThemeSpec[]) {
		const themes = _themes.value;
		for (const newTheme of newThemes) {
			if (themes.has(newTheme.keyName)) {
				debug.warn(`Attempted to add theme "${newTheme.keyName}" when a theme with that name already existed. Skipping and keeping the existing theme.`);
				continue;
			}
			_themes.value.set(newTheme.keyName, newTheme);
		}
		triggerRef(_themes);
	},
	all() {
		return _themes.value.values();
	},
	getByKeyName(keyName: string): ThemeSpec | undefined {
		return _themes.value.get(keyName);
	},
	get(keyName: string | false = false, orSaved: boolean = true, orDefault: boolean = true): ThemeSpec {
		const byKeyName = keyName ? intf.getByKeyName(keyName) : undefined;
		if (byKeyName) return byKeyName;
		const saved = orSaved ? intf.getSavedTheme() : undefined;
		if (saved) return saved;
		const defaultTheme = orDefault ? intf.getDefaultTheme() : undefined;
		if (defaultTheme) return defaultTheme;
		return fallbackTheme;
	},
	getSavedTheme(): ThemeSpec | undefined {
		const themeKeyName = savedThemeKeyName.get();
		if (!themeKeyName) return undefined;
		if (!intf.getByKeyName(themeKeyName)) console.warn(
			"Stored key name %c" +
			themeKeyName +
			"%c does not correspond to any known theme. The theme may be missing from the application's ApplicationThemesProvider.",
			"color: #800",
			"color: unset",
		);
		return intf.getByKeyName(themeKeyName);
	},
	setSavedTheme: savedThemeKeyName.set,
	getDefaultTheme(): ThemeSpec {
		return intf.getByKeyName(props.defaultTheme);
	},
};

export type ApplicationThemesInterface = typeof intf;
export type ApplicationThemesRef = typeof themesRef;

intf.add(...props.themes);

provide<ApplicationThemesInterface>(k.INTERFACE, intf);
provide<ApplicationThemesRef>(k.THEMES, themesRef);
</script>

<template>
<slot />
</template>
