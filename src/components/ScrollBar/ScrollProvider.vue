<script setup lang="ts">
import {computed, provide, reactive, readonly, ref, type Ref, toRefs} from "vue";
import {scrollStateUpdater, setupScroll} from "@/components/ScrollBar/ScrollState.ts";
import {
	type Overflows,
	type ScrollBarSettings,
	ScrollBarSettingsActionType,
	type ScrollState,
	ScrollStateActionSource,
	ScrollStateActionType
} from "@/components/ScrollBar/types.ts";
import type XY from "@t/XY.ts";
import scrollBarSettingsUpdater, {initialScrollBarSettings} from "@/components/ScrollBar/ScrollSettings.ts";
import {ScrollProviderProvides as keys} from "@/components/ScrollBar/keys.ts";
import useTheme, {canUseTheme} from "@/providers/ThemeProvider/useTheme.ts";
import {scrolls} from "@/components/ScrollBar/util.ts";

type Props = { nativeScrollOverride?: boolean | undefined };
const props = withDefaults(defineProps<Props>(), { nativeScrollOverride: undefined });
const {nativeScrollOverride} = toRefs(props);


const _scrollState = reactive(setupScroll());

const themeRef = canUseTheme() ? useTheme().themeRef : null;
const themeNativeScroll = computed(() => {
	return themeRef ? themeRef.value.nativeScroll : true;
});

const _scrollSettings = reactive(initialScrollBarSettings());
const rawScrollSettings = readonly(_scrollSettings);
const scrollSettings = computed(() => {
	return {
		...rawScrollSettings,
		x: {
			...rawScrollSettings.x,
			visible: nativeScrollOverride.value === undefined ? rawScrollSettings.x.visible && !themeNativeScroll.value : themeNativeScroll.value,
		},
		y: {
			...rawScrollSettings.y,
			visible: nativeScrollOverride.value === undefined ? rawScrollSettings.y.visible && !themeNativeScroll.value : themeNativeScroll.value,
		}
	};
});

type XYUpdateFunction = (xy: Partial<XY>, source?: ScrollStateActionSource) => ScrollState;
export type ScrollInterface = {
	scrollByPx: XYUpdateFunction,
	scrollToPx: XYUpdateFunction,
	scrollByFraction: XYUpdateFunction,
	scrollToFraction: XYUpdateFunction,
	updateFromElement: (element: HTMLElement, source?: ScrollStateActionSource) => ScrollState,
	setOverflows: (overflows: Overflows) => ScrollBarSettings,
	setRequired: (required: Partial<XY<boolean>>) => ScrollBarSettings,
	setRequiredFromElement: (element: HTMLElement) => ScrollBarSettings,
	updateSettings: (settings: Partial<ScrollBarSettings>) => ScrollBarSettings,
};

const intf: ScrollInterface = Object.freeze({
	scrollByPx(xy: XY, source: ScrollStateActionSource = ScrollStateActionSource.EXTERNAL) {
		return scrollStateUpdater(_scrollState, {
			type: ScrollStateActionType.scrollBy,
			source,
			...xy,
		});
	},
	scrollToPx(xy: XY, source = ScrollStateActionSource.EXTERNAL) {
		return scrollStateUpdater(_scrollState, {
			type: ScrollStateActionType.scrollTo,
			source,
			...xy
		});
	},
	scrollByFraction(xy: XY, source = ScrollStateActionSource.EXTERNAL) {
		return scrollStateUpdater(_scrollState, {
			type: ScrollStateActionType.scrollByFraction,
			source,
			...xy
		});
	},
	scrollToFraction(xy: XY, source = ScrollStateActionSource.EXTERNAL) {
		return scrollStateUpdater(_scrollState, {
			type: ScrollStateActionType.scrollToFraction,
			source,
			...xy
		});
	},
	updateSettings(settings: Partial<ScrollBarSettings>) {
		return scrollBarSettingsUpdater(_scrollSettings, {
			type: ScrollBarSettingsActionType.update,
			settings
		});
	},
	setOverflows(overflows: Overflows) {
		return scrollBarSettingsUpdater(_scrollSettings, {
			type: ScrollBarSettingsActionType.setOverflows,
			...overflows,
		});
	},
	setRequired(required) {
		return scrollBarSettingsUpdater(_scrollSettings, {
			type: ScrollBarSettingsActionType.setRequired,
			...required
		});
	},
	setRequiredFromElement(element: HTMLElement) {
		return this.setRequired({
			x: scrolls(element, "x"),
			y: scrolls(element, "y")
		});
	},
	updateFromElement(element: HTMLElement, source?: ScrollStateActionSource) {
		return scrollStateUpdater(_scrollState, {
			type: ScrollStateActionType.apply,
			source: source ?? ScrollStateActionSource.INITIAL,
			element,
		});
	}
});

provide(keys.INTERFACE, intf);
provide(keys.STATE, readonly(ref(_scrollState)));
provide(keys.SETTINGS, scrollSettings);
</script>
<template>
	<slot/>
</template>
