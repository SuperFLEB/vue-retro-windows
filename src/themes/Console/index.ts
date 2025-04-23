import type {ThemeSpec} from "@t/Theme.ts";
import AboutTheme from "./components/AboutTheme.vue";
import RwWindowChrome from "./components/RwWindowChrome.vue";
import RwDesktop from "./components/RwDesktop.vue";
import RwVisualMangler from "./components/RwVisualMangler.vue";
import RwScrollBars from "./components/RwScrollBars.vue";
import LockedScrollPane from "./components/LockedScrollPane.vue";
import RwSubMenu from "./components/RwSubMenu.vue";

const theme: ThemeSpec = {
	keyName: "fleb/console",
	displayName: "Console",
	uniqueClassName: "theme-fleb-console",
	background: "#008",
	minWinSize: {x: 300, y: 100},
	hijackScroll: true,
	nativeScroll: false,
	components: {
		AboutTheme,
		RwDesktop,
		RwWindowChrome,
		RwVisualMangler,
		RwScrollBars,
		RwWindowPane: LockedScrollPane,
		RwSubMenu,
	},
	effects: {
		textOnly: true,
		monospace: true,
		dithering: true,
		detachMdi: true,
	}
};

export default theme;
