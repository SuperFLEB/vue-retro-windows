import {computed, inject, readonly, type Ref} from "vue";
import {ScrollProviderProvides as s} from "./keys.ts";
import type {ScrollBarSettings, ScrollState} from "@int/components/ScrollBar/types.ts";
import type {ScrollInterface} from "@int/components/ScrollBar/ScrollProvider.vue";
import {ComposableOutOfContextError} from "@int/errors.ts";

const useScroll = () => {
	const state = inject<Ref<ScrollState>>(s.STATE);
	const settings = inject<Ref<ScrollBarSettings>>(s.SETTINGS);
	const intf = inject<ScrollInterface>(s.INTERFACE);

	if (!(state && intf && settings)) {
		throw new ComposableOutOfContextError("Failed to get scroll context. useScroll must be called within a ScrollProvider")
	}

	const visible = readonly(computed(() => {
		return ({
			x: settings.value.x.visible,
			y: settings.value.y.visible,
		});
	}));

	return {
		state,
		visible,
		interface: intf
	};
};

export default useScroll;