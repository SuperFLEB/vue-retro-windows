<script setup lang="ts">
import {useWindow} from "@/providers/WinManProvider/useWindow.ts";
import ScrollProvider from "@/components/ScrollBar/ScrollProvider.vue";
import Handle from "@/components/ResizeHandles/Handle.vue";
import ScrollBars from "@/components/ScrollBar/ScrollBars.vue";
import useMenu from "@/components/Menu/useMenu.ts";

const emit = defineEmits(["movestart", "windowfocus", "windowblur"]);

const {props: windowProps} = useWindow();

const canMinimize = true;
const canResize = true;

function moveStart(e: MouseEvent) {
	const target = e.target as HTMLElement;
	if (!Array.from(target.classList).includes("drag")) return;
	emit("movestart", e);
}

const { interface: menuIntf } = useMenu();
function focusin(e: MouseEvent | TouchEvent) {
	menuIntf.setMenu(windowProps.menu);
	emit("windowfocus", e);
}
</script>

<template>
	<div :class="[{focus: windowProps.focus}, 'frame container', {resizeable: canResize, minimizable: canMinimize}]"
		 :tabindex="-1" @focusin="focusin"
		 @focusout="$emit('windowblur', $event)">
		<div :tabIndex="-1" class="titleBar drag" @touchstart="moveStart($event)" @mousedown="moveStart($event)">
			<div class="titleClose">
				<button type="button" class="closeButton">✕</button>
			</div>
			<div class="titleName drag">{{ windowProps.title }}</div>
		</div>
		<div class="main">
			<ScrollProvider>
				<ScrollBars/>
				<div class="contentWrapper">
					<slot/>
				</div>
			</ScrollProvider>
		</div>
		<Handle class="resizeHandle" corner="se"/>
	</div>
</template>

<style src="../assets/ChicagoFLF.css"/>
<style src="../assets/SystemOneUI.css"/>
<style scoped lang="scss">
@use "@/styles/WindowChromeBasic.scss";
@use "RwWindowChrome";
</style>