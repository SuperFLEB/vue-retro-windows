<script setup lang="ts">
import {provide, shallowReadonly, shallowRef} from "vue";
import type {ApplicationDefinition, ApplicationId} from "@t/Application.js";
import k from "./keys.js";

type Props = { apps?: Iterable<ApplicationDefinition>, autoLaunchApps?: ApplicationDefinition[] };
const props = withDefaults(defineProps<Props>(), {
	apps: () => [],
	autoLaunchApps: () => [],
});

const registry = shallowRef(new Map<ApplicationId, ApplicationDefinition>());
export type ApplicationCollectionRegistry = typeof registry;

const intf = Object.freeze({
	getApplicationDefinition(id: ApplicationId): ApplicationDefinition {
		if (!registry.value.has(id)) throw new Error(`Application ${id} is not registered`);
		return {...registry.value.get(id)!};
	},
	getComponent(id: ApplicationId) {
		return this.getApplicationDefinition(id).component;
	},
	getLauncherIcon(id: ApplicationId) {
		const app = this.getApplicationDefinition(id);
		return app.launcherIcon;
	},
	register(...apps: ApplicationDefinition[]): ApplicationId[] {
		for (const app of apps) {
			if (registry.value.has(app.id)) {
				console.error(`Application ${app.displayName} or one sharing the id ${app.id.toString()} is already registered. Skipping.`);
			}
			registry.value.set(app.id, app);
		}
		return apps.map(a => a.id);
	},
	resolveOrRegister(app: ApplicationDefinition): ApplicationId {
		if (registry.value.has(app.id)) return app.id;
		return this.register(app)[0];
	}
} as const);

export type ApplicationCollectionInterface = typeof intf;

// Register any apps passed in props
for (const app of new Set(props.apps)) {
	intf.register(app);
}

provide(k.INTERFACE, intf);
provide(k.REGISTRY, shallowReadonly(registry));
</script>

<template>
<slot />
</template>

<style scoped>

</style>