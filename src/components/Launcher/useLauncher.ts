import useAppManager from "@/providers/AppManagerProvider/useAppManager.ts";
import useApplicationCollection from "@/providers/ApplicationCollectionProvider/useApplicationCollection.ts";
import type {ApplicationDefinition, ApplicationId} from "@t/Application.ts";
import type {Pid} from "@t/AppInstance.ts";
import LauncherIcon from "@/components/Launcher/LauncherIcon.vue";
import type {LauncherIconComponent} from "@t/Launcher.ts";

type LauncherFunction = (() => void) | ApplicationDefinition | ApplicationId;

export type LauncherProps = {
	launch: LauncherFunction;
	label?: string;
	parent?: Pid;
	icon?: LauncherIconComponent;
}

export default function useLauncher({launch, label, parent, icon}: LauncherProps) {
	const {interface: appManIntf} = useAppManager();
	const {interface: appCollectionIntf} = useApplicationCollection();

	switch (typeof launch) {
		case "function":
			// Function
			return {
				launchFunction: launch,
				IconComponent: icon ?? LauncherIcon,
				label: label ?? launch.name ?? "Unknown Function",
			};
		case "string":
			// Application ID
			return {
				launchFunction: () => appManIntf.launch(launch, parent ?? 0),
				IconComponent: appCollectionIntf.getLauncherIcon(launch),
				label: label ?? appCollectionIntf.getApplicationDefinition(launch).displayName,
			};
		case "object": {
			// ApplicationDefinition
			const id = appCollectionIntf.resolveOrRegister(launch as ApplicationDefinition);
			return {
				launchFunction: () => appManIntf.launch(id, parent ?? 0),
				label: label ?? appCollectionIntf.getApplicationDefinition(id).displayName,
				IconComponent: appCollectionIntf.getLauncherIcon(id),
			};
		}
	}
}
