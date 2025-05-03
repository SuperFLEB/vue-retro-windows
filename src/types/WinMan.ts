import type Box from '@t/Box';
import type {MenuItemSpec} from "@/components/Menu/types.ts";

export type WinManRegistry = Record<WinUid, WindowProps>;

export const enum WindowSource {
	STATIC,
	DYNAMIC,
}
export type WinUid = string;
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
	uid: WinUid;
};

export type ValidPartialWindowProps = Partial<WindowProps> & Required<Pick<WindowProps, "uid">>;
