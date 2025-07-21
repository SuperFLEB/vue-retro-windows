<script setup lang="ts">

import windowChromeSvgUrl from "@themes/ThreePointWin/assets/windowChrome.svg";
import type {WindowInstance} from "@t/WindowInstance.ts";
import {computed, useSlots} from "vue";
import useWindowManager from "@/providers/AppManagerProvider/useWindowManager.ts";

type Props = { windowInstance: WindowInstance };
const props = withDefaults(defineProps<Props>(), {});
const slots = useSlots();

const { bindInterface } = useWindowManager();
const boundInterface = computed(() => bindInterface(props.windowInstance.uid));
const subWindow = computed(() => props.windowInstance.parentUid !== null);
const state = computed(() => props.windowInstance.state);

function minimize() {
	boundInterface.value.minimize();
}

function maximize() {
	boundInterface.value.maximize();
}

function restore() {
	boundInterface.value.restore();
}
</script>

<template>
	<div :tabIndex="-1" :class="['noTheme', 'titleBar', { 'altContent': slots.default, subWindow }]">
		<div v-if="!slots.default" class="title" @touchstart="$emit('movestart', $event)" @mousedown="$emit('movestart', $event)">
			{{ props.windowInstance.title }}
		</div>
		<div v-else class="titleAltContent">
			<slot />
		</div>

		<button
			type="button"
			class="windowButton contextMenuButton"
		>
			<img alt="Context Menu" :src="windowChromeSvgUrl + (subWindow ? '#mdiClose' : '#close')"/>
		</button>

		<button type="button" v-if="!subWindow || state !== 'MAXIMIZED'" @click="minimize" class="windowButton minimizeButton">
			<img alt="Minimize" :src="windowChromeSvgUrl + '#minimize'"/>
		</button>
		<button type="button" v-if="state !== 'MAXIMIZED'" @click="maximize" class="windowButton maximizeButton">
			<img alt="Maximize" :src="windowChromeSvgUrl + '#maximize'"/>
		</button>
		<button v-if="state === 'MAXIMIZED'" type="button" @click="restore"
				class="windowButton restoreButton">
			<img alt="Maximize" :src="windowChromeSvgUrl + '#restore'"/>
		</button>
	</div>

</template>

<style scoped lang="scss">
@use "@/styles/WindowChromeBasic.scss";
@use "RwWindowChrome/WindowChrome.scss";
</style>