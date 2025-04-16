<script setup lang="ts">
import {type DeepReadonly, provide, readonly, ref, type Ref} from "vue";
import type {MenuItemSpec} from "./types.ts";
import combine from "./combine.ts";
import keys from "./keys.ts";
import {useWindow} from "@int/components/WindowManagementProvider/useWindowManager.ts";

type Props = { useNearestWindow?: boolean, baseMenu?: MenuItemSpec };
const props = withDefaults(defineProps<Props>(), {useNearestWindow: true});

const _menus = ref<(MenuItemSpec | null)[]>([null, null]);
const _combined = ref<MenuItemSpec | null>(null);
const menuRef = readonly(_combined);

function update() {
	const menus = _menus.value.filter(m => m !== null);
	if (!menus.length) {
		_combined.value = null;
		return;
	}
	_combined.value = combine(menus);
}

const intf = {
	setBaseMenu(menu: MenuItemSpec | null) {
		_menus.value[0] = menu;
		update();
	},
	setMenu(menu: MenuItemSpec | null) {
		_menus.value[1] = menu;
		update();
	},
	hasMenu() {
		return _menus.value[0] && _menus.value[1];
	},
	clearMenu() {
		_menus.value[1] = null;
		update();
	}
} as const;

if (props.useNearestWindow) {
	try {
		const {props: windowProps} = useWindow();
		intf.setBaseMenu(windowProps.menu);
	} catch (e) {
		console.warn("Unable to find a window to get menu information from. Did you forget to set useNearestWindow to false on a MenuProvider?");
	}
}

if (props.baseMenu) intf.setBaseMenu(props.baseMenu);

export type MenuInterface = typeof intf;
export type MenuSpecRef = DeepReadonly<Ref<MenuItemSpec>>;

provide<MenuInterface>(keys.INTERFACE, intf);
provide<MenuSpecRef>(keys.MENUSPEC, menuRef);
</script>
<template>
	<slot/>
</template>
