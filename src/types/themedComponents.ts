import type {Component, DefineComponent, SlotsType} from "vue";
import type {MenuItemSpec, MenuItemState} from "@/components/Menu/types.ts";
import type {Dimension} from "@t/scroll.ts";

type Empty = Record<never, never>;
type ComponentShape<Props = Empty, Slots extends SlotsType = SlotsType<{ default: () => any }>> = DefineComponent<Props, any, any, {}, {}, {}, {}, {}, string, any, any, any , Slots>;

export type AboutTheme = ComponentShape<Empty, Empty>;
export type RwDesktop = ComponentShape;
export type RwWindowChrome = ComponentShape;
export type RwWindowPane = ComponentShape;

// export type RwScrollBar = DefineComponent<{ dimension: Dimension }, any, any, {}, {}, {}, {}, {}, string, any, any>;
export type RwScrollBar = ComponentShape<{ dimension: Dimension }, Empty>;

export type RwScrollBars = ComponentShape;
export type RwScrollBarCorner = ComponentShape;

export type RwVisualMangler = ComponentShape;
export type RwWindowDragProxy = ComponentShape;
export type RwMenuBar = ComponentShape;
export type RwSubMenu = ComponentShape;
export type RwMenuItem = ComponentShape<{ spec: MenuItemSpec, item: MenuItemState, hasToggle?: boolean }>;
