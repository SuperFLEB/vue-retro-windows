import type {Component} from "vue";
import type XY from "@t/XY.js";

type ApplicationComponentProps = {
	target?: string | undefined;
};
export type ApplicationComponent = Component<ApplicationComponentProps>;

export type ApplicationId = string;

export type ApplicationDefinition = {
	id: ApplicationId;
	displayName: string;
	component: ApplicationComponent;
	launcherIcon: Component<{size: XY}>;
	recyclable: boolean;
};

export type InstalledApplicationRegistry = Map<ApplicationId, ApplicationDefinition>;
export type InstalledApplicationRegistrationFunction = (r: ApplicationDefinition) => void;
export type ApplicationInstaller = ((reg: InstalledApplicationRegistrationFunction) => void);
