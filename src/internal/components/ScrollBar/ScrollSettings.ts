import {type ScrollBarSettingsAction, type ScrollBarSettings, ScrollBarSettingsActionType} from "./types.ts";
import {deepAssign} from "@int/util.ts";

export const initialScrollBarSettings = (init: Partial<ScrollBarSettings> = {}): ScrollBarSettings => {
	return {
		x: {
			overflow: "auto",
			required: false,
			visible: false,
			...init.x,
		},
		y: {
			overflow: "auto",
			required: false,
			visible: false,
			...init.y,
		},
		dead: {
			required: false,
			visible: true,
			...init.dead,
		},
		...init,
	};
};

const updateVisibility = (state: ScrollBarSettings) => {
	for (const dimension of ["x", "y"] as const) {
		state[dimension].visible = state[dimension].overflow === "scroll" || state[dimension].required;
	}
};

const scrollBarSettingsUpdater = (state: ScrollBarSettings = {} as ScrollBarSettings, action: ScrollBarSettingsAction) => {
	switch (action.type) {
		case ScrollBarSettingsActionType.setOverflows:
			state.x.overflow = action.x ?? action.overflow ?? state.x.overflow;
			state.y.overflow = action.y ?? action.overflow ?? state.y.overflow;
			updateVisibility(state);
			return state;
		case ScrollBarSettingsActionType.setRequired:
			state.x.required = action.x ?? state.x.required;
			state.y.required = action.y ?? state.y.required;
			state.dead.required = action.dead ?? state.dead.required;
			updateVisibility(state);
			return state;
		case ScrollBarSettingsActionType.update:
			deepAssign(action.settings, state);
			return state;
	}
};

export default scrollBarSettingsUpdater;

