import type {CompleteThemeSpec, ThemeSpec} from "@t/Theme";
import {DemoThemedScroll, DemoNativeScroll, DemoProxyDrag} from "./_Demo";
import ThreePointWin from "./ThreePointWin";
import ThreePointWinClassic from "./ThreePointWinClassic";
import SystemOne from "./SystemOne";
import Console from "./Console";
import EGAVGA from "./EGAVGA";

const themes: ThemeSpec[] = [
	DemoThemedScroll,
	DemoNativeScroll,
	DemoProxyDrag,
	ThreePointWin,
	ThreePointWinClassic,
	EGAVGA,
	SystemOne,
	Console
];

// This is only an advisory type for IDE hints, and should not be relied upon for type checking.
export type BuiltInThemes = "fleb/threepointwin" | "fleb/threepointwin/arial" | "fleb/systemone" | "fleb/console" | "fleb/egavga";

export default themes;
