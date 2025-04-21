import type {DefineComponent} from "vue";
import type {WindowProps} from "@t/WinMan.ts";

type Handler<E extends Event> = (event: E) => void;

export type AboutTheme = DefineComponent<Record<string, never>>
export type RwWindowChrome = DefineComponent<{
	dragStartHandler: Handler<MouseEvent>,
	focusinHandler: Handler<FocusEvent>,
	focusoutHandler: Handler<FocusEvent>
}, any, any, any>;
export type RwDesktop = DefineComponent<Record<string, never>>;
export type RwWindowPane<AdditionalProps = {}> = DefineComponent<{ windowProps: WindowProps } & AdditionalProps>;
export type RwScrollBar<AdditionalProps = {}> = DefineComponent<Record<string, never> & AdditionalProps>;
export type RwScrollBars<AdditionalProps = {}> = DefineComponent<Record<string, never> & AdditionalProps>;
export type RwScrollBarCorner<AdditionalProps = {}> = DefineComponent<Record<string, never> & AdditionalProps>;
export type RwVisualMangler = DefineComponent<{}>;
export type RwWindowDragProxy = DefineComponent<{}>;
export type RwMenuBar = DefineComponent<{}>;
export type RwSubMenu = DefineComponent<{}>;
export type RwMenuItem = DefineComponent<{}>;
