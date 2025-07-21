<script setup lang="ts">
import {useWindow} from "@/providers/WindowProvider/useWindow.ts";
import ScrollProvider from "@/components/ScrollBar/ScrollProvider.vue";
import ResizeHandle from "@/components/ResizeHandles/ResizeHandle.vue";
import ScrollBars from "@/components/ScrollBar/ScrollBars.vue";
import useMenu from "@/components/Menu/useMenu.ts";

const emit = defineEmits(["movestart", "windowfocus", "windowblur"]);

const {instance: windowInstance} = useWindow();

const canMinimize = true;
const canResize = true;

function moveStart(e: MouseEvent | TouchEvent) {
	const target = e.target as HTMLElement;
	if (!Array.from(target.classList).includes("drag")) return;
	emit("movestart", e);
}

const { interface: menuIntf } = useMenu();
function focusin(e: FocusEvent) {
	menuIntf.setMenu(windowInstance.menu);
	emit("windowfocus", e);
}
</script>

<template>
	<div :class="[{focus: windowInstance.focus}, 'frame', 'container', {resizeable: canResize, minimizable: canMinimize}]"
		 :tabindex="-1" @focusin="focusin"
		 @focusout="$emit('windowblur', $event)">
		<div :tabIndex="-1" class="titleBar drag" @touchstart="moveStart($event)" @mousedown="moveStart($event)">
			<div class="titleClose">
				<button type="button" class="closeButton">✕</button>
			</div>
			<div class="titleName drag">{{ windowInstance.title }}</div>
		</div>
		<div class="main">
			<ScrollProvider>
				<ScrollBars/>
				<div class="contentWrapper">
					<slot/>
				</div>
			</ScrollProvider>
		</div>
		<ResizeHandle class="resizeHandle" corner="se"/>
	</div>
</template>

<style src="../assets/ChicagoFLF.css"/>
<style src="../assets/SystemOneUI.css"/>
<style scoped lang="scss">
@use "@/styles/WindowChromeBasic.scss";
@use "RwWindowChrome";
</style>