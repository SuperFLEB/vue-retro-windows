import type {ThemeSpec} from "@t/Theme";
import {DemoThemedScroll, DemoNativeScroll} from "./_Demo";
import ThreePointWin from "./ThreePointWin";
import SystemOne from "./SystemOne";
import Console from "./Console";
import EGAVGA from "./EGAVGA";

export type BuiltInThemes = "fleb/threepointwin" | "fleb/systemone" | "fleb/console" | "fleb/egavga";
export { DemoThemedScroll, DemoNativeScroll, ThreePointWin, SystemOne, Console, EGAVGA };
export default [DemoThemedScroll, DemoNativeScroll, ThreePointWin, EGAVGA, SystemOne, Console] as ThemeSpec[];
