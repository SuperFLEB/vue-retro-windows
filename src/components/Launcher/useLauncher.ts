import useAppManager from "@/providers/AppManagerProvider/useAppManager.ts";
import useApplicationCollection from "@/providers/ApplicationCollectionProvider/useApplicationCollection.ts";
import type {ApplicationDefinition, ApplicationId} from "@t/Application.ts";
import type {Pid} from "@t/AppInstance.ts";
import LauncherIcon from "@/components/Launcher/LauncherIcon.vue";

export type LauncherProps = {
	launch: (() => void) | ApplicationDefinition | ApplicationId;
	label?: string;
	parent?: Pid;
	icon?: string;
}

export default function useLauncher({launch, label, parent}: LauncherProps) {
	const {interface: appManIntf} = useAppManager();
	const {interface: appCollectionIntf} = useApplicationCollection();

	// TODO: Support custom icons on launch functions
	if (typeof launch === "function") return {IconComponent: LauncherIcon, launchFunction: launch, label: label ?? "Unknown Function" };

	const applicationId = typeof launch === "string" ? launch : appCollectionIntf.resolveOrRegister(launch as ApplicationDefinition);
	const launchFunction = () => appManIntf.launch(applicationId, parent ?? 0);
	const IconComponent = (typeof launch === "function") ? LauncherIcon : appCollectionIntf.getLauncherIcon(applicationId);
	label = label ?? appCollectionIntf.getApplicationDefinition(applicationId).displayName;

	return {IconComponent, launchFunction, label };
}
