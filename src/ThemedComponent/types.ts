import type {MenuItemSpec, MenuItemState} from "@/components/Menu/types.ts";
import type {Dimension} from "@t/scroll.ts";
import type Empty from "@t/Empty.js";
import type {ComponentShape} from "@t/ComponentShape.js";
import type {ApplicationDefinition, ApplicationId} from "@t/Application.js";

export type ThemeComponents = {
	AboutTheme: ComponentShape<Empty>;
	RwWindowChrome: ComponentShape<Empty>;
	RwWindowDragProxy: ComponentShape<Empty>;
	RwDesktop: ComponentShape<Empty>;
	RwWindowPane: ComponentShape<Empty>;
	RwWindowBox: ComponentShape<Empty>;
	RwScrollBars: ComponentShape<Empty>;
	RwScrollBarX: ComponentShape<{ dimension: Dimension }, Empty>;
	RwScrollBarY: ComponentShape<{ dimension: Dimension }, Empty>;
	RwScrollBarCorner: ComponentShape<Empty>;
	RwVisualMangler: ComponentShape<Empty>;
	RwSubMenu: ComponentShape<Empty>;
	RwMenuItem: ComponentShape<{ spec: MenuItemSpec, item: MenuItemState, hasToggle?: boolean }>;
	RwFolderSpace: ComponentShape<{ context: "desktop" | "folder" }>;
	RwLauncher: ComponentShape<{ app: ApplicationDefinition | ApplicationId, attachment?: string, label?: string }>;
	RwMinimizedWindowSpace: ComponentShape<Empty>;
};
