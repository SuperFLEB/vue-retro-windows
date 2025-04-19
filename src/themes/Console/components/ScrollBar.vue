<script setup lang="ts">
import {useWindow} from "@/components/WindowManagementProvider/useWindowManager.ts";
import {computed, useTemplateRef} from "vue";
import {charGrid} from "../constants.ts";
import useRepeatButton from "@/composables/useRepeatButton.ts";
import useScroll from "@/components/ScrollBar/useScroll.ts";

type Props = { dimension: "x" | "y" };
const props = defineProps<Props>();
const sbRef = useTemplateRef("sb");

const {props: windowProps} = useWindow();
const {visible, state: scrollState, interface: scrollInterface} = useScroll();
const lengthDim = props.dimension === "x" ? "width" : "height";

const state = computed(() => {
	const chLen = Math.floor(windowProps[lengthDim] / charGrid[props.dimension]);
	const trackChLen = chLen - 4;
	const chPos = Math.round(scrollState.value[props.dimension].at * (chLen - 5));
	return {
		visible: windowProps.focus && visible.value[props.dimension],
		trackChLen,
		chLen,
		chPos,
		...scrollState.value[props.dimension]
	};
});
const fills = {x: "◀═░■▶", y: "▲║░■▼"}[props.dimension];
const colorVars = computed(() => {
	// Just to trip reactivity
	windowProps.focus;

	if (!sbRef.value) return {};

	let elem: Element = sbRef.value;
	const cs = getComputedStyle(elem);
	const fg = cs.color;
	let bg = cs.backgroundColor;
	while (elem.parentElement && ["transparent", "rgba(0, 0, 0, 0)"].includes(bg)) {
		elem = elem.parentElement;
		bg = getComputedStyle(elem).backgroundColor;
	}

	return {
		"--currentColor": fg,
		"--currentBackground": bg,
	};
});

const {mouseDownHandler: page} = useRepeatButton((_: Event, direction: 1 | -1 = 1) => {
	scrollInterface.scrollByFraction({[props.dimension]: direction * scrollState.value[props.dimension].windowSize});
}, 100);
</script>

<template>
	<div ref="sb" :class="['scrollBar', dimension]" :style="colorVars">
		<template v-if="state.visible">
			<button type="button">{{ fills[0] }}</button>
			<div class="track" @mousedown="page($event, -1)">{{fills[2].repeat(state.chPos)}}</div>
			<div class="track thumb">{{ fills[3] }}</div>
			<div class="track" @mousedown="page($event, 1)">{{fills[2].repeat(state.trackChLen - state.chPos - 1)}}</div>
			<button type="button">{{ fills[4] }}</button>
		</template>
		<template v-else>
			<div class="noTrack">{{ (fills[1] + (dimension === "y" ? "\n" : "")).repeat(state.chLen - 2) }}</div>
		</template>
	</div>
</template>

<style scoped>
.scrollBar {
	position: absolute;
	white-space: normal;

	button {
		width: 1ch;
		border: 0;
		padding: 0;
		margin: 0;
		font: inherit;
		color: var(--currentBackground);
		background-color: var(--currentColor);
	}

	&.x {
		.track, button {
			display: inline-block;
		}

		bottom: 0;
		left: 1ch;
	}

	&.y {
		width: 1ch;

		.track, button {
			width: 1ch;
			overflow-wrap: anywhere;
			display: block;
		}

		.noTrack {
			padding: 0;
		}

		top: 1lh;
		right: 0;
	}

	.thumb {
		color: var(--currentBackground);
		background-color: var(--currentColor);
	}
}
</style>