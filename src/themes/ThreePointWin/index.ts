import WindowChrome from "./components/WindowChrome.vue";
import ScrollBar from "./components/ScrollBar.vue";
import Desktop from "./components/Desktop.vue";
import WindowDragProxy from "./components/WindowDragProxy.vue";
import type {ThemeSpec} from "@t/Theme.ts";

const theme: ThemeSpec = {
	keyName: "fleb/threepointwin",
	displayName: "Three Point Win",
	uniqueClassName: "theme-fleb-threepointwin",
	components: {
		WindowChrome,
		WindowDragProxy,
		ScrollBarX: ScrollBar,
		ScrollBarY: ScrollBar,
		Desktop,
	},
	effects: {
		menu: true,
		desktopMenu: false,
	},
	useProxyDrag: true,
	background: "#68a",
	minWinSize: { x: 180, y: 40 },
	nativeScroll: false,
	mdiSubWindows: true,
};

export default theme;
