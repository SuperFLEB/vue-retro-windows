import type {ThemeSpec} from "@t/Theme.ts";
import AboutTheme from "./components/AboutTheme.vue";
import RwWindowChrome from "./components/RwWindowChrome.vue";
import RwScrollBar from "./components/RwScrollBar.vue";
import RwDesktop from "./components/RwDesktop.vue";
import RwWindowDragProxy from "./components/RwWindowDragProxy.vue";
import RwFolderSpace from "./components/RwFolderSpace.vue";
import RwLauncher from "./components/RwLauncher.vue";

const theme: ThemeSpec = {
	keyName: "fleb/threepointwin",
	displayName: "Three Point Win",
	uniqueClassName: "theme-fleb-threepointwin",
	canMinimize: true,
	canMaximize: true,
	components: {
		AboutTheme,
		RwWindowChrome,
		RwWindowDragProxy,
		RwScrollBarX: RwScrollBar,
		RwScrollBarY: RwScrollBar,
		RwLauncher,
		RwDesktop,
		RwFolderSpace,
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
