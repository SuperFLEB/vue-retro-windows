<script setup lang="ts">
import useApplicationThemes from "@/providers/ThemeCollectionProvider/useApplicationThemes.ts";

const props = defineProps<{ themeName: string }>();
const theme = useApplicationThemes().interface.get(props.themeName);
</script>
<template>
	<p v-if="theme.keyName === 'core/base'">This is the base theme used as a fallback to all other themes.</p>
	<p v-else>The author has not provided any information about this theme.</p>
</template>
