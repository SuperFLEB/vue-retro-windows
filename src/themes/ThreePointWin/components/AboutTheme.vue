<script setup lang="ts">
import type {ThemeSpec} from "@t/Theme.ts";

type Props = { themeName: string };
const props = withDefaults(defineProps<Props>(), {});
</script>
<template>
	<p>Three Point Win theme by FLEB (a.k.a. SuperFLEB)</p>
</template>
