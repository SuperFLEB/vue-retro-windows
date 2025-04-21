import AboutTheme from "./components/AboutTheme.vue";
import RwWindowChrome from "./components/RwWindowChrome.vue";
import RwDesktop from "./components/RwDesktop.vue";
import RwVisualMangler from "./components/RwVisualMangler.vue";
import type {ThemeSpec} from "@t/Theme.ts";
import RwScrollBar from "./components/RwScrollBar.vue";

const theme: ThemeSpec = {
	keyName: "fleb/egavga",
	displayName: "EGA/VGA",
	uniqueClassName: "theme-fleb-egavga",
	background: "#888",
	nativeScroll: false,
	effects: {
		// TODO: Add menu support for EGAVGA
		menu: false,
		desktopMenu: false,
		dithering: true,
	},
	components: {
		AboutTheme,
		RwWindowChrome,
		RwDesktop,
		RwVisualMangler,
		RwScrollBarX: RwScrollBar,
		RwScrollBarY: RwScrollBar
	},
};

export default theme;
