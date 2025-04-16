import type {Component, VNode} from "vue";
import type {MenuTypes, MenuType} from "./MenuTypes.ts";

type MenuActionHandler = (e: MouseEvent, item: MenuItemSpec) => void;
type Rendered = Component | ((p: {item: MenuItemSpec}) => VNode | VNode[]);

type DisplayItemType =  (
	{
		name: string | symbol;
		display: string;
		props?: never | null;
	} | {
		name: string | symbol;
		display: Rendered;
		props?: Record<string, any>;
	} |
	{
		name: string;
		display?: never | null;
		props?: never | null;
	}
	);

type SimpleItemSpec = {
	name: string | symbol;
	type: typeof MenuTypes.ACTION | typeof MenuTypes.TOGGLE;
	sub?: never | null;
	group?: never | null;
	action?: MenuActionHandler;
} & DisplayItemType;

type SubItemSpec = {
	name: string | symbol;
	type: typeof MenuTypes.SUB;
	sub: MenuItemSpec[];
	group?: never | null;
	action?: never | null;
} & DisplayItemType;

type RadioItemSpec = {
	type: typeof MenuTypes.RADIO;
	name: string | symbol;
	group: string | symbol;
	sub?: never | null;
	action?: MenuActionHandler;
} & DisplayItemType;

type SeparatorItemSpec = {
	name?: string | symbol;
	type: typeof MenuTypes.SEPARATOR;
	group?: never | null;
	sub?: never | null;
	action?: never | null;
	display?: never | null;
	props?: never | null;
};

type CustomItemSpec = {
	type: typeof MenuTypes.CUSTOM;
	name: string | symbol;
	group?: never | null;
	sub?: never | null;
	action?: MenuActionHandler;
	display: Rendered;
	props?: Record<string, any>;
};

type ImplicitItemSpec = ({
	type?: never,
	name: string | symbol;
	sub: MenuItemSpec[];
	action?: never | null;
} | {
	type?: never,
	name: string | symbol;
	sub?: never | null;
	action?: MenuActionHandler;
}) & DisplayItemType;

export type MenuItemSpec = {
	name?: string | symbol;
	type?: MenuType;
	id?: string | symbol;
	display?: string | Component;
	props?: Record<string, any>;
	sub?: MenuItemSpec[];
	action?: MenuActionHandler;
} & (
	SimpleItemSpec | SubItemSpec | RadioItemSpec | SeparatorItemSpec | CustomItemSpec | ImplicitItemSpec
	);

export type MenuItemState = MenuItemSpec & {
	open: boolean;
	checked: boolean;
};

export type TypedMenuItemSpec = MenuItemSpec & {
	type: MenuType;
};
