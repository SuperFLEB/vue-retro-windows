import WindowChrome from "./components/WindowChrome.vue";
import Desktop from "./components/Desktop.vue";
import VisualElementMangler from "./components/VisualElementMangler.vue";
import type {ThemeSpec} from "@t/Theme.ts";
import ScrollBar from "@/themes/EGAVGA/components/ScrollBar.vue";

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
		WindowChrome,
		Desktop,
		VisualElementMangler,
		ScrollBarX: ScrollBar,
		ScrollBarY: ScrollBar
	},
};

export default theme;
