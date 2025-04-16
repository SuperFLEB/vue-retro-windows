<script setup lang="ts">
import useMenu from "@/components/Menu/useMenu.ts";
import type {MenuItemSpec} from "@/components/Menu/types.ts";
import MenuItem from "@/components/Menu/MenuItem.vue";

const { menuRef } = useMenu();
</script>

<template>
	<div v-if="menuRef" class="menuBar"><MenuItem :root="true" :spec="menuRef as MenuItemSpec" /></div>
</template>
<style scoped lang="scss" src="./MenuBarBasic.scss" />
