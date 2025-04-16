const MenuTypeNames = ["ACTION", "TOGGLE", "RADIO", "SUB", "SEPARATOR", "CUSTOM"] as const;
export type MenuType = typeof MenuTypeNames[number];
type MenuTypeIdentity = {
	[K in MenuType]: K;
};
export const MenuTypes = Object.freeze(Object.fromEntries<MenuType>(MenuTypeNames.map(e => [e,e]))) as MenuTypeIdentity;
