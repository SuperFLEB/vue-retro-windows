import WindowChrome from "./components/WindowChrome.vue";
import Desktop from "./components/Desktop.vue";
import VisualElementMangler from "./components/VisualElementMangler.vue";
import type {ThemeSpec} from "@t/Theme.ts";
import ScrollBars from "./components/ScrollBars.vue";
import LockedScrollPane from "./components/LockedScrollPane.vue";
import SubMenu from "./components/SubMenu.vue";

const theme: ThemeSpec = {
	keyName: "fleb/console",
	displayName: "Console",
	uniqueClassName: "theme-fleb-console",
	background: "#008",
	minWinSize: {x: 300, y: 100},
	hijackScroll: true,
	nativeScroll: false,
	components: {
		Desktop,
		WindowChrome,
		VisualElementMangler,
		ScrollBars,
		Pane: LockedScrollPane,
		SubMenu,
	},
	effects: {
		textOnly: true,
		monospace: true,
		dithering: true,
		detachMdi: true,
	}
};

export default theme;
