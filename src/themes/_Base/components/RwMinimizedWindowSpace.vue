<script setup lang="ts">
import {canUseWindow, useWindow} from "@/providers/WindowProvider/useWindow.ts";
import {computed} from "vue";
import useWindowManager from "@/providers/AppManagerProvider/useWindowManager.ts";
import type {WinUid} from "@t/WinMan.ts";
import {ThemedComponent} from "../../../ThemedComponent";
import type {WindowInstance} from "@t/WindowInstance.ts";

const {interface: winManInterface, childrenByState: rootChildrenByState} = useWindowManager();

const windowInstance = canUseWindow() && useWindow().instance;

const childrenByState = computed(() => windowInstance ? windowInstance.childrenByState : rootChildrenByState.value);
const children = computed(() => [...childrenByState.value.MINIMIZED].map(childUid => winManInterface.get(childUid) as WindowInstance));

function restore(childUid: WinUid) {
	winManInterface.restore(childUid);
}
</script>

<template>
	<div>
		<ThemedComponent v-for="child in children" is="RwLauncher" :launch="() => restore(child.uid)" :label="child.title" :key="child.uid"/>
	</div>
</template>
