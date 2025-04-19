<script setup lang="ts">
import {MenuTypes} from "@/components/Menu/MenuTypes.ts";
import RenderMenuItem from "@/components/Menu/RenderMenuItem.ts";
import SubMenu from "@/components/Menu/SubMenu.vue";
import type {MenuItemSpec, MenuItemState} from "@/components/Menu/types.ts";
type Props = { spec: MenuItemSpec, item: MenuItemState, hasToggle?: boolean };
const props = withDefaults(defineProps<Props>(), { hasToggle: false, checked: false });
const display = props.spec.display ?? props.spec.name ?? "!!UNTITLED!!";
defineEmits(["click"]);
</script>

<template>
	<li tabindex="-1" class="menuItem">
		<span class="toggle" v-if="props.hasToggle">{{ item.checked ? "X" : "-" }}</span>
		<hr v-if="props.spec.type === MenuTypes.SEPARATOR" />
		<RenderMenuItem @click="$emit('click', $event)" class="item" v-else :item :display fallback="span"/>
		<SubMenu class="menu sub" v-if="item.sub" :sub="props.spec.sub"/>
	</li>
</template>