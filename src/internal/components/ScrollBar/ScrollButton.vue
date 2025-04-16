<script setup lang="ts">
import type {Dimension, ScrollDirection} from "@t/scroll.ts";
import useScroll from "@int/components/ScrollBar/useScroll.ts";
import useRepeatButton from "@int/composables/useRepeatButton.ts";
import {xyOfDim} from "@int/util.ts";

type Props = { dimension: Dimension, direction: ScrollDirection, disabled?: boolean };
const props = defineProps<Props>();
const {dimension, direction} = props;
const multiplier = direction === "back" ? -1 : 1;

const {interface: {scrollByPx}} = useScroll();
const {mouseDownHandler} = useRepeatButton(() => {
	scrollByPx(xyOfDim(dimension, multiplier * 20));
}, 50);

</script>

<template>
	<button type="button" :="$attrs" :class="['button', dimension, direction, {disabled: !props.disabled}]" :disabled="props.disabled" @mousedown="mouseDownHandler"><slot/></button>
</template>
