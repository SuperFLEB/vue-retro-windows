import debug from "@/debug";
const THEME_KEY_STORAGE_KEY = "superfleb/winman-vue/theme" as const;

const intf = Object.freeze({
	get(): string | undefined {
		const themeKeyName = window.sessionStorage.getItem(THEME_KEY_STORAGE_KEY);
		if (themeKeyName) {
			console.info(
				`💾🠪 Retrieved global theme name %c${themeKeyName}%c from session storage. To clear this value and revert to the default theme, run %csetWinManTheme()%c on the developer console.`,
				"color: #080",
				"color: unset",
				"color: #080",
				"color: unset",
			);
			return themeKeyName;
		}

		debug.info("No theme key found in session storage.");
		return undefined;
	},
	set(themeKeyName: string | null): void {
		if (themeKeyName === null) {
			window.sessionStorage.removeItem(THEME_KEY_STORAGE_KEY);
			console.info("💾💥 Cleared global theme selection.");
			return;
		}
		window.sessionStorage.setItem(THEME_KEY_STORAGE_KEY, themeKeyName);
		console.info("💾⬅ Updated global theme selection:", themeKeyName);
	},
});

declare global {
	var setWinManTheme: (keyName: string | null) => void;
}
globalThis.setWinManTheme = (keyName = null) => {
	const action = keyName === null ? "Cleared" : "Set";
	intf.set(keyName);
	console.info(`${action} global theme selection. Refresh to see the change.`);
};

export default intf;
