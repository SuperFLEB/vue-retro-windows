<script setup lang="ts">
import ThemedFolderSpace from "@/components/FolderSpace/ThemedFolderSpace.vue";
import RwWindow from "@/components/Window/RwWindow.vue";
type Props = { context: "desktop" | "folder" };
withDefaults(defineProps<Props>(), { context: "folder" });
</script>

<template>
	<template v-if="context === 'desktop'">
		<RwWindow win-id="41e3d302-2681-4774-af6d-8b63ecafb1ef" title="Program Manager" :x="100" :y="100" :width="600" :height="600">
			<RwWindow :x="0" :y="0" :width="400" :height="400" win-id="a0fcdd1f-b427-44f0-b4bc-e188178ef9ca" title="Main">
				<ThemedFolderSpace :rtl="false" :column="false"><slot /></ThemedFolderSpace>
			</RwWindow>
		</RwWindow>
	</template>
	<template v-if="context === 'folder'">
		<ThemedFolderSpace :rtl="false" :column="false"><slot /></ThemedFolderSpace>
	</template>
</template>

<style scoped>
.folderSpace {
	padding: 10px;
}
</style>