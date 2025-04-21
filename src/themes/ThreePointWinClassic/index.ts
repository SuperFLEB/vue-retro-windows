import type {ThemeSpec} from "@t/Theme.ts";
import AboutTheme from "./AboutTheme.vue";
import RwDesktop from "./RwDesktop.vue";
import basedOnTheme from "../ThreePointWin/index.ts";

/*
This theme is a variation on ThreePointWin that includes classic pixel fonts for UI elements.
This theme REQUIRES the ThreePointWin theme to also be available at ../ThreePointWin.
*/

const theme: ThemeSpec = {
	...basedOnTheme,
	keyName: "fleb/threepointwin/classic",
	displayName: "Three Point Win (Classic Fonts)",
	uniqueClassName: "theme-fleb-threepointwin-classic",
	components: {
		...basedOnTheme.components,
		AboutTheme,
		RwDesktop,
	},
};

export default theme;
