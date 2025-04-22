<script setup lang="ts">
import ThemedFolderSpace from "@/components/FolderSpace/ThemedFolderSpace.vue";
type Props = { context: "desktop" | "folder" };
const props = withDefaults(defineProps<Props>(), { scope: "folder" });
const tfsProps = {
	folder: { rtl: false, column: false },
	desktop: { rtl: true, column: true },
}[props.context];
</script>

<template>
<ThemedFolderSpace v-bind="tfsProps"><slot /></ThemedFolderSpace>
</template>

<style scoped>
.folderSpace {
	padding: 10px;
}
</style>