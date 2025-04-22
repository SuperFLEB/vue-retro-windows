<script setup lang="ts">
import {provide, readonly, ref} from "vue";
import type {ApplicationDefinition, ApplicationId} from "@t/Application.js";
import k from "@/providers/AppManProvider/keys.js";
import uuid from "@/util/uuid.js";

type Props = { apps?: ApplicationDefinition[], autoLaunchApps?: ApplicationDefinition[] };
const props = withDefaults(defineProps<Props>(), {
	apps: () => [],
	autoLaunchApps: () => [],
});

// App/window state format
export type InstanceDataStore = {
	winMan: {},
	appMan: {},
	instanceData: {},
};

export type Instance = {
	pid: number;
	appId: ApplicationId;
	alive: boolean;
	data: InstanceDataStore;
};

function createInstance(pid: number, appId: ApplicationId, data?: Partial<InstanceDataStore>): Instance {
	return {
		pid,
		appId,
		alive: true,
		data: {
			winMan: {
				winId: uuid(true)
			},
			appMan: {},
			instanceData: {},
			...data,
		},
	};
}

export type Instances = Map<number, Instance>;

const registry = new Map<ApplicationId, ApplicationDefinition>();
const instances = ref<Instances>(new Map());
let lastPid = 0;

const intf = Object.freeze({
	getApplication(id: ApplicationId): ApplicationDefinition {
		if (!registry.has(id)) throw new Error(`Application ${id} is not registered`);
		return {...registry.get(id)!};
	},
	getComponent(id: ApplicationId) {
		return this.getApplication(id).component;
	},
	getLauncherIcon(id: ApplicationId) {
		const app = this.getApplication(id);
		return app.launcherIcon;
	},
	launch(appId: ApplicationId) {
		const pid = lastPid++;
		instances.value.set(pid, createInstance(pid, appId, {}));
	},
	terminate(pid: number) {
		const instance = instances.value.get(pid);
		if (instance === undefined) {
			console.error(`Failed to terminate pid ${pid}. The instance could not be found.`);
			return;
		}
		instances.value.set(pid, {...instance, alive: false});
	},
	register(...apps: ApplicationDefinition[]): ApplicationId[] {
		for (const app of apps) {
			if (registry.has(app.id)) {
				console.error(`Application ${app.displayName} or one sharing the id ${app.id.toString()} is already registered. Skipping.`);
			}
			registry.set(app.id, app);
		}
		return apps.map(a => a.id);
	},
	resolveOrRegister(app: ApplicationDefinition): ApplicationId {
		if (registry.has(app.id)) return app.id;
		return this.register(app)[0];
	}
} as const);
export type AppManProviderInterface = typeof intf;

// Register any apps passed in props
for (const app of new Set([...props.apps, ...props.autoLaunchApps])) {
	intf.register(app);
}

// Launch any apps passed as autoLaunchApps
for (const app of props.autoLaunchApps) {
	intf.launch(app.id);
}

provide(k.INTERFACE, intf);
provide(k.INSTANCES, readonly(instances));
</script>

<template>
	<slot/>
</template>
