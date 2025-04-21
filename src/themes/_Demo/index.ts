/**
 * Debug themes intended to have everything fall through to _Base.
 */
import type {ThemeSpec} from "@t/Theme.ts";
import AboutTheme from "./AboutTheme.vue";

export const DemoThemedScroll: ThemeSpec = {
	keyName: "core/debug-themed-scroll",
	displayName: "Debug: Base theme, themed scroll",
	uniqueClassName: "theme-core-debug-themed-scroll",
	background: "#a66",
	minWinSize: { x: 200, y: 50 },
	nativeScroll: false,
	hijackScroll: false,
	debugModeOnly: true,
	components: {
		AboutTheme,
	},
};

export const DemoNativeScroll: ThemeSpec = {
	...DemoThemedScroll,
	keyName: "core/debug-native-scroll",
	displayName: "Debug: Base theme, native scroll",
	uniqueClassName: "theme-core-debug-native-scroll",
	nativeScroll: true,
	debugModeOnly: true,
	components: {
		AboutTheme,
	},
};


export const DemoProxyDrag: ThemeSpec = {
	...DemoNativeScroll,
	keyName: "core/debug-proxy-drag",
	displayName: "Debug: Base theme, proxy drag",
	uniqueClassName: "theme-core-debug-proxy-drag",
	useProxyDrag: true,
	components: {
		AboutTheme,
	},
};

