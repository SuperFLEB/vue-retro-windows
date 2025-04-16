import type {DefineComponent} from "vue";
import type {WindowProps} from "@t/WinMan.ts";

type Handler<E extends Event> = (event: E) => void;

export type WindowChrome = DefineComponent<{
	dragStartHandler: Handler<MouseEvent>,
	focusinHandler: Handler<FocusEvent>,
	focusoutHandler: Handler<FocusEvent>
}, any, any, any>;
export type FeatureWindow<AdditionalProps = {}> = DefineComponent<{ windowProps: WindowProps } & AdditionalProps>;
export type Desktop = DefineComponent<Record<string, never>>;
export type Pane<AdditionalProps = {}> = DefineComponent<{ windowProps: WindowProps } & AdditionalProps>;
export type ScrollBar<AdditionalProps = {}> = DefineComponent<Record<string, never> & AdditionalProps>;
export type ScrollBars<AdditionalProps = {}> = DefineComponent<Record<string, never> & AdditionalProps>;
export type ScrollBarCorner<AdditionalProps = {}> = DefineComponent<Record<string, never> & AdditionalProps>;
export type VisualElementMangler = DefineComponent<{}>;
export type WindowDragProxy = DefineComponent<{}>;
export type MenuBar = DefineComponent<{}>;
export type SubMenu = DefineComponent<{}>;
export type MenuItem = DefineComponent<{}>;
