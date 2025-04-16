import useTheme from "@int/components/ThemeProvider/useTheme.ts";
import type {MenuItemSpec} from "@int/components/Menu/types.ts";
export default function useThemeMenu() {
	const {interface: {getThemesInfo, setCurrentTheme}} = useTheme();
	const themes = getThemesInfo();

	function pick(keyName: string) {
		setCurrentTheme(keyName);
	};

	return {
		name: "Theme",
		sub: themes.map(t => ({
			name: t.displayName,
			action: () => pick(t.keyName)
		}))
	} as MenuItemSpec;
}