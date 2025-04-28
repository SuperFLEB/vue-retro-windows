<script setup lang="ts">
import ThemedFolderSpace from "@/components/FolderSpace/ThemedFolderSpace.vue";

type Props = { context: "desktop" | "folder" };
defineProps<Props>();
</script>

<template>
	<ThemedFolderSpace :rtl="false" :column="false">
		<slot/>
	</ThemedFolderSpace>
</template>

<style scoped>
.folderSpace {
	padding: 10px;
}
</style>