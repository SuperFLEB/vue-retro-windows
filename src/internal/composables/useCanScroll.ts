import {computed, type ComputedRef} from "vue";
import type {Dimension} from "@t/scroll.ts";
import useScroll from "@int/components/ScrollBar/useScroll.ts";

export type DimensionPreference = Dimension | "both" | "either";
type CanScrollResponse = ComputedRef<Record<DimensionPreference, boolean>>;

const useCanScroll = (): CanScrollResponse => {
	const scrollContext = useScroll();
	return computed(() => {
		const scrollable = {
			x: false,
			y: false,
			"both": false,
			"either": false,
		};

		const visible = scrollContext.visible;

		if (visible.value.x) scrollable.x = true;
		if (visible.value.y) scrollable.y = true;
		if (visible.value.x && visible.value.y) scrollable.both = true;
		if (visible.value.x || visible.value.y) scrollable.either = true;

		return scrollable;
	});
};

export default useCanScroll;