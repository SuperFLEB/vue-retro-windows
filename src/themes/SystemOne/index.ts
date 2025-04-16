import WindowChrome from "./components/WindowChrome.vue";
import WindowDragProxy from "./components/WindowDragProxy.vue";
import ScrollBar from "./components/ScrollBar.vue";
import Desktop from "./components/Desktop.vue";
import VisualElementMangler from "./components/VisualElementMangler.vue";
import ScrollBarCorner from "./components/ScrollBarCorner.vue";
import type {ThemeSpec} from "@t/Theme.ts";
import ScrollBars from "./components/ScrollBars.vue";

const theme: ThemeSpec = {
	keyName: "fleb/systemone",
	displayName: "System One",
	uniqueClassName: "theme-fleb-systemone",
	components: {
		WindowChrome,
		Desktop,
		ScrollBarX: ScrollBar,
		ScrollBarY: ScrollBar,
		ScrollBars: ScrollBars,
		ScrollBarCorner: ScrollBarCorner,
		VisualElementMangler,
		WindowDragProxy
	},
	effects: {
		menu: true,
		desktopMenu: true,
		monochrome: true,
		blackAndWhite: true,
		detachMdi: true,
	},
	useProxyDrag: true,
	background: "#68a",
	minWinSize: { x: 180, y: 40 },
	nativeScroll: false,
};

export default theme;
