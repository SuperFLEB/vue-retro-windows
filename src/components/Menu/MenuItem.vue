<script setup lang="ts">
import type {MenuItemSpec, MenuItemState} from "./types.ts";
import {MenuTypes} from "./MenuTypes.ts";
import {computed} from "vue";
import SubMenu from "@/components/Menu/SubMenu.vue";
import ThemedComponent from "@/ThemedComponent/ThemedComponent.vue";

type Props = { spec: MenuItemSpec, checked?: boolean, root?: boolean };
const props = withDefaults(defineProps<Props>(), {checked: false, root: false});
const spec = props.spec;

const hasToggle = spec.type === MenuTypes.TOGGLE || spec.type === MenuTypes.RADIO;
const action = (e: MouseEvent, s: MenuItemSpec) => {
	if (!spec.action) return;
	spec.action(e, s);
};

const item = computed<MenuItemState>(() => ({
	...props.spec,
	checked: props.checked,
	open: false,
}));
const noRenderRoot = props.root && spec.type === MenuTypes.SUB;
</script>

<template>
	<SubMenu v-if="noRenderRoot" :sub="props.spec.sub ?? []" class="menu root" />
	<ThemedComponent v-else @click="action($event, spec)" is="RwMenuItem" :hasToggle :spec :item />
</template>