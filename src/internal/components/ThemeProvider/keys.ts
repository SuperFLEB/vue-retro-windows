const ThemeProviderInjectables = Object.freeze({
	INTERFACE: Symbol("INTERFACE"),
	CURRENT_THEME_REF: Symbol("CURRENT_THEME_REF"),
	IS_ROOT_THEME: Symbol("IS_ROOT_THEME"),
} as const);

export default ThemeProviderInjectables;
