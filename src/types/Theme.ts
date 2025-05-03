import type XY from "@t/XY.ts";
import type CssModule from "@t/CssModule.ts";
import type {Like} from "@t/Like.ts";
import type {ThemeComponents} from "@/themed/types.ts";

export const defaultThemeEffects = Object.freeze({
	monochrome: false as boolean,
	blackAndWhite: false as boolean,
	dithering: false as boolean,
	monospace: false as boolean,
	textOnly: false as boolean,
	detachMdi: true as boolean,
	menu: true as boolean,
	desktopMenu: false as boolean,
} as const satisfies Record<string, boolean>) ;

// An informational list of side effects the theme causes on page content. Setting these will not cause anything to
// happen in the theme. They are used by other exported to understand how they will be rendered.
export type ThemeEffects = Like<typeof defaultThemeEffects>;
export type ThemeEffectsList = (keyof ThemeEffects)[];

export type ThemeInfo = {
	keyName: string;
	displayName: string;
	uniqueClassName: string;
	background?: string;
	minWinSize?: XY;
	nativeScroll?: boolean;
	hijackScroll?: boolean;
	useProxyDrag?: boolean;
	mdiSubWindows?: boolean;
	desktopMenu?: boolean;
	className?: string;
	effects?: Partial<ThemeEffects>;
	style?: CssModule;
	debugModeOnly?: true;
	themeSpecificSettings?: Record<string, any>;
};

export type ThemeSpec = ThemeInfo & { components: Partial<ThemeComponents> };

export type CompleteThemeSpec = Required<ThemeSpec> & {
	components: ThemeComponents;
	effects: Required<ThemeEffects>;
};
export type CompleteThemeInfo = Required<ThemeInfo> & {
	effects: Required<ThemeEffects>;
};

export type Themes = ThemeSpec[];

export type ThemesMap = Map<string, ThemeSpec>;