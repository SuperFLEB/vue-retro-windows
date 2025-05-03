<script setup lang="ts">
import ThemedFolderSpace from "@/components/FolderSpace/ThemedFolderSpace.vue";
import RwWindow from "@/components/Window/RwWindow.vue";
type Props = { context: "desktop" | "folder" };
const props = withDefaults(defineProps<Props>(), { scope: "folder" });
const tfsProps = {
	folder: { rtl: false, column: false },
	desktop: { rtl: true, column: true },
}[props.context];
</script>

<template>
	<template v-if="context === 'desktop'">
		<RwWindow win-id="41e3d302-2681-4774-af6d-8b63ecafb1ef" title="Applications" :x="0" :y="0" :width="480" :height="640">
			<slot></slot>
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