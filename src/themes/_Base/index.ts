import WindowDragProxy from "@/components/Window/WindowDragProxy.vue";
import {type CompleteThemeSpec, defaultThemeEffects} from "@t/Theme.ts";
import RwWindowChrome from "./components/RwWindowChrome.vue";
import RwDesktop from "./components/RwDesktop.vue";
import RwWindowPane from "./components/RwWindowPane.vue";
import RwScrollBar from "./components/RwScrollBar.vue";
import RwVisualMangler from "./components/RwVisualMangler.vue";
import RwScrollBarCorner from "./components/RwScrollBarCorner.vue";
import RwSubMenu from "./components/RwSubMenu.vue";
import RwScrollBars from "./components/RwScrollBars.vue";
import RwMenuItem from "./components/RwMenuItem.vue";
import AboutTheme from "./components/AboutTheme.vue";
import RwWindowDragProxy from "./components/RwWindowDragProxy.vue";
import RwFolderSpace from "./components/RwFolderSpace.vue";
/*
 * This is a base theme used as a fallback for when themes are missing exported.
 * You shouldn't put this into your config/themes.ts unless you're testing it.
 *
 * This theme includes all exported and settings with sane default values. It uses settings such as nativeScroll: true
 * that mean that all exported are not shown when viewing this theme, so you should use the _Demo theme to test.
 *
 * You should NOT copy, extend, or inherit from this, e.g., using:
 *
 *   { ...baseTheme, [your changes] }
 *
 * because utility parameters like "debugModeOnly" will also be set. Instead, omit any properties you intend to
 * "fall through", and the composeTheme function will take care of doing so properly as necessary.
 */

const theme: CompleteThemeSpec = {
	keyName: "core/base",
	displayName: "Base/fallback theme",
	uniqueClassName: "theme-core-base",
	background: "#666",
	minWinSize: { x: 200, y: 50 },
	nativeScroll: true,
	hijackScroll: false,
	debugModeOnly: true,
	useProxyDrag: false,
	mdiSubWindows: false,
	desktopMenu: false,
	components: {
		AboutTheme,
		RwWindowChrome,
		RwDesktop,
		RwWindowPane,
		RwScrollBars,
		RwScrollBarX: RwScrollBar,
		RwScrollBarY: RwScrollBar,
		RwScrollBarCorner,
		RwVisualMangler,
		RwSubMenu,
		RwMenuItem,
		RwWindowDragProxy,
		RwFolderSpace,
	},
	effects: {
		...defaultThemeEffects
	},
	themeSpecificSettings: {},
};

export default theme;
