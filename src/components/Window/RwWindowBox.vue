<script setup lang="ts">
import {computed} from "vue";
import {useWindow} from "@/providers/WindowProvider/useWindow.ts";
import useTheme from "@/providers/ThemeProvider/useTheme.ts";
import {boxOf} from "@/util.ts";
import type Box from "@t/Box.ts";
import type {WindowState} from "@t/WindowInstance.ts";
import {ThemedComponent} from "../../ThemedComponent";

const {instance: windowInstance} = useWindow();
const {themeRef} = useTheme();

const box = computed<Box>(() => themeRef.value.useProxyDrag ? boxOf(windowInstance) : boxOf(windowInstance.proxyBox ?? windowInstance));
const state = computed<WindowState>(() => windowInstance.state ?? "NORMAL");
const z = computed<number>(() => windowInstance.z);
</script>

<template>
	<ThemedComponent is="RwWindowBox" :box :state :z><slot /></ThemedComponent>
</template>
