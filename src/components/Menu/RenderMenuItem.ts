import type {MenuItemState} from "@/components/Menu/types.ts";
import {h, type VNode} from "vue";

export default {
	props: {
		item: {
			type: Object,
			required: true,
		},
		display: {
			type: [Function, String],
			required: true,
		},
		fallback: {
			type: String,
			required: true,
		}
	},
	setup({display, item, fallback}: { display: ((props: {item: MenuItemState}) => VNode | VNode[]) | string, item: MenuItemState, fallback: string }) {
		if (typeof display === "string") {
			return () => h(fallback, display);
		}
		return () => display({ item });
	}
}