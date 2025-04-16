import {
	type DefaultWindowProps,
	type ValidPartialWindowProps,
	type WindowProps,
	WindowSource,
	type WinId
} from "@t/WinMan.ts";

export const defaultWindowProps: DefaultWindowProps = {
	x: 0,
	y: 0,
	z: 0,
	width: 200,
	height: 200,
	title: "Untitled Window",
	focus: false,
	source: WindowSource.STATIC,
	menu: null,
	proxyBox: null,
};

let autoCounter = 0;
export const newWinId = (): WinId => {
	return `autowinid:${++autoCounter}`;
}

export const createWindowProps = (
	windowProps: Partial<WindowProps> | null,
	winId?: WinId | null,
	defaults = defaultWindowProps,
): WindowProps =>
	(({
		winId: windowProps?.winId ?? winId ?? newWinId(),
		...defaults,
		...(windowProps || {}),
	}) as WindowProps);

export const clean = (
	windowProps: ValidPartialWindowProps,
	defaults: DefaultWindowProps | Record<never, never> = defaultWindowProps,
	defaultKeyObject: WindowProps = {...defaultWindowProps, winId: ""},
) => {
	const cleaned: ValidPartialWindowProps = {...defaults, ...windowProps} as ValidPartialWindowProps;
	for (const key in cleaned) {
		if (!(key in defaultKeyObject)) {
			delete cleaned[key as keyof WindowProps];
		}
	}
	return cleaned;
};
