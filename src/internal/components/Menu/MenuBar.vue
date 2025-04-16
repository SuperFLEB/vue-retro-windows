<script setup lang="ts">
import useMenu from "@int/components/Menu/useMenu.ts";
import type {MenuItemSpec} from "@int/components/Menu/types.ts";
import MenuItem from "@int/components/Menu/MenuItem.vue";

const { menuRef } = useMenu();
</script>

<template>
	<div v-if="menuRef" class="menuBar"><MenuItem :root="true" :spec="menuRef as MenuItemSpec" /></div>
</template>
<style scoped lang="scss" src="./MenuBarBasic.scss" />
