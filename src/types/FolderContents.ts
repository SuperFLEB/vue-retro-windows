import type {ApplicationId} from "@t/Application.js";
import type XY from "@t/XY.js";

export type FolderItemType = "application";

export type FolderItem = {
	type: FolderItemType;
} & XY;

export type ApplicationItem = FolderItem & {
	type: "application";
	source: ApplicationId;
};

export type FolderContents = ApplicationItem[];
