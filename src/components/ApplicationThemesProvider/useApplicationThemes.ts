import k from "./keys.ts";
import {inject} from "vue";
import {ComposableOutOfContextError} from "@/errors.ts";
import type {ApplicationThemesInterface} from "./ApplicationThemesProvider.vue";
import type {ApplicationThemesRef} from "@/components/ApplicationThemesProvider/ApplicationThemesProvider.vue";

export default function useApplicationThemes() {
	const intf = inject<ApplicationThemesInterface>(k.INTERFACE);
	const themesRef = inject<ApplicationThemesRef>(k.THEMES);
	if (!intf || !themesRef) throw new ComposableOutOfContextError("useApplicationThemes must be called from within an ApplicationThemesProvider");
	return {interface: intf, themesRef};
}