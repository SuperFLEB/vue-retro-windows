import type {ThemeSpec} from "@t/Theme.ts";
import AboutTheme from "./components/AboutTheme.vue";
import RwWindowChrome from "./components/RwWindowChrome.vue";
import RwWindowDragProxy from "./components/RwWindowDragProxy.vue";
import RwScrollBar from "./components/RwScrollBar.vue";
import RwDesktop from "./components/RwDesktop.vue";
import RwVisualMangler from "./components/RwVisualMangler.vue";
import RwScrollBarCorner from "./components/RwScrollBarCorner.vue";
import RwScrollBars from "./components/RwScrollBars.vue";
import RwFolderSpace from "./components/RwFolderSpace.vue";

const theme: ThemeSpec = {
	keyName: "fleb/systemone",
	displayName: "System One",
	uniqueClassName: "theme-fleb-systemone",
	components: {
		AboutTheme,
		RwWindowChrome,
		RwDesktop,
		RwScrollBarX: RwScrollBar,
		RwScrollBarY: RwScrollBar,
		RwScrollBars,
		RwScrollBarCorner,
		RwVisualMangler,
		RwWindowDragProxy: RwWindowDragProxy,
		RwFolderSpace,
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
