import {hasInjectionContext, inject, type Ref} from "vue";
import type {ThemeProviderInterface} from "@/components/ThemeProvider/types.ts";
import {ComposableOutOfContextError} from "@/errors.ts";
import type {CompleteThemeSpec} from "@t/Theme.ts";
import k from "./keys.ts";

type UseThemeResponse = {
	themeRef: Ref<CompleteThemeSpec>,
	isRootTheme: boolean,
	interface: ThemeProviderInterface,
};

export const canUseTheme = () => Boolean(hasInjectionContext() && inject(k.INTERFACE, null));

const useTheme = () => {
	const themeRef = inject<Ref<CompleteThemeSpec>>(k.CURRENT_THEME_REF);
	const isRootTheme = inject<boolean>(k.IS_ROOT_THEME);
	const intf = inject<ThemeProviderInterface>(k.INTERFACE);

	if (!themeRef || !intf || (isRootTheme === undefined)) throw new ComposableOutOfContextError("No theme information. You're probably using useTheme used outside its proper context.");

	const result: UseThemeResponse = {
		themeRef,
		isRootTheme,
		interface: intf,
	};
	return result;
};

export default useTheme;