import useAppManager from "@/providers/AppManagerProvider/useAppManager.ts";
import useApplicationCollection from "@/providers/ApplicationCollectionProvider/useApplicationCollection.ts";
import type {ApplicationDefinition, ApplicationId} from "@t/Application.ts";

export default function useLauncher({app, label}: {app: ApplicationDefinition | ApplicationId, label?: string}) {
	const {interface: appManIntf} = useAppManager();
	const {interface: appCollectionIntf} = useApplicationCollection();

	const applicationId = typeof app === "object" ? appCollectionIntf.resolveOrRegister(app) : app;

	const IconComponent = appCollectionIntf.getLauncherIcon(applicationId);

	label = label ?? appCollectionIntf.getApplicationDefinition(applicationId).displayName;

	function launchFunction() {
		appManIntf.launch(applicationId, 0);
	}

	return {IconComponent, launchFunction, label };
}
