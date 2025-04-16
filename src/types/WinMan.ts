import type Box from '@t/Box';
import type {MenuItemSpec} from "@int/components/Menu/types.ts";

export type WinManRegistry = Record<WinId, WindowProps>;

export const enum WindowSource {
	STATIC,
	DYNAMIC,
}
export type WinId = string;
export type DefaultWindowProps = Box & {
	z: number;
	title: string;
	focus: boolean;
	source: WindowSource;
	proxyBox: Box | null;
	menu: MenuItemSpec | null;
};
export type WindowProps = DefaultWindowProps & {
	winId: WinId;
};

export type ValidPartialWindowProps = Partial<WindowProps> & Required<Pick<WindowProps, "winId">>;
