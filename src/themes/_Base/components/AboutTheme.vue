<script setup lang="ts">
import type {ThemeSpec} from "@t/Theme.ts";
defineProps<{ themeName: string }>();
</script>
<template>
	<p v-if="theme.keyName === 'core/base'">This is the base theme used as a fallback to all other themes.</p>
	<p v-else>The author has not provided any information about this theme.</p>
</template>
