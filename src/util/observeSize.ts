import {onUnmounted, type Ref, ref, watch} from "vue";
import type XY from "@t/XY.ts";

const contentSizeRef = (elementRef: Ref<HTMLElement | null>): Ref<XY> => {
	const contentBoxSizeRef = ref<XY>({
		x: elementRef.value?.clientWidth || 0,
		y: elementRef.value?.clientHeight || 0,
	});

	const update = (ents: ResizeObserverEntry[]) => {
		// There can be only one
		const ent = ents[ents.length - 1];
		contentBoxSizeRef.value.x = ent.contentRect.width;
		contentBoxSizeRef.value.y = ent.contentRect.height;
	};

	const ro = new ResizeObserver(update);

	watch(elementRef, (is, was) => {
		if (was) ro.unobserve(was);
		if (!is) return;

		const box = is.getClientRects()[0];
		contentBoxSizeRef.value.x = box.width;
		contentBoxSizeRef.value.y = box.height;
		ro.observe(is);
	}, {immediate: true});

	onUnmounted(() => {
		ro.disconnect();
	});

	return contentBoxSizeRef;
};

export default contentSizeRef;