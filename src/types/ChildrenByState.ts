import type {WinUid} from "@t/WinMan.ts";
import type {WindowState} from "@t/WindowInstance.ts";
export type ChildrenByState = Record<WindowState, Set<WinUid>>;
