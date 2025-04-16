import {type CompleteThemeSpec, defaultThemeEffects, type ThemeSpec} from "@t/Theme.ts";

type ComposeTheme = (partial: ThemeSpec, base: CompleteThemeSpec) => CompleteThemeSpec;
export const composeTheme: ComposeTheme = (partial, base) => {
	return {
		...base,
		...partial,
		components: {
			...base.components,
			...partial.components,
		},
		effects: {
			...defaultThemeEffects,
			...base.effects,
			...partial.effects,
		}
	};
};
