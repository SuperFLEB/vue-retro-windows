<script setup lang="ts">
import {toRefs} from "vue";
import ResizeHandle from "./ResizeHandle.vue";
import type CardinalCorner from "@t/CardinalCorner.ts";

type Props = { corners: CardinalCorner[] };
const props = defineProps<Props>();
const {corners} = toRefs(props);
</script>

<template>
	<div class="resizeHandles">
		<ResizeHandle v-for="corner in corners" :corner :key="corner" />
	</div>
</template>

<style scoped lang="scss">
.resizeHandle {
	position: absolute;

	width: 10px;
	height: 10px;

	&.ne, &.nw {
		top: 0;
	}

	&.se, &.sw {
		bottom: 0;
	}

	&.nw, &.sw {
		left: 0;
	}

	&.ne, &.se {
		right: 0;
	}
}
</style>