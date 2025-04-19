import WindowDragProxy from "@/components/Window/WindowDragProxy.vue";
import {type CompleteThemeSpec, defaultThemeEffects} from "@t/Theme.ts";
import WindowChrome from "./components/WindowChrome.vue";
import Desktop from "./components/Desktop.vue";
import Pane from "./components/Pane.vue";
import ScrollBar from "./components/ScrollBar.vue";
import VisualElementMangler from "./components/VisualElementMangler.vue";
import ScrollBarCorner from "./components/ScrollBarCorner.vue";
import SubMenu from "./components/SubMenu.vue";
import ScrollBars from "./components/ScrollBars.vue";
import MenuItem from "./components/MenuItem.vue";

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
		WindowChrome,
		WindowDragProxy,
		Desktop,
		Pane,
		ScrollBars: ScrollBars,
		ScrollBarX: ScrollBar,
		ScrollBarY: ScrollBar,
		ScrollBarCorner: ScrollBarCorner,
		VisualElementMangler,
		SubMenu,
		MenuItem,
	},
	effects: {
		...defaultThemeEffects
	}
};

export default theme;
