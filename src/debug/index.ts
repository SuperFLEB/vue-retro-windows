export type ApplicationMetaData = {
	displayName: string;
	keyName: string;
	available: boolean;
};

const APP = {
	displayName: "RwApplication",
	keyName: "unknownApp",
	available: false,
	sessionKey: "@superfleb/debug:default",
};
let debugModeMemo: boolean | null = null;

export const setDebugMode = (active: boolean) => {
	const newSetting = active ?? !getDebugMode();
	debugModeMemo = newSetting;
	if (newSetting) {
		sessionStorage.setItem(APP.sessionKey, "on");
	} else {
		sessionStorage.removeItem(APP.sessionKey);
	}
	console.info(
		`${newSetting ? "💡" : "🚫"} ${APP.displayName} debug mode ${newSetting ? "enabled" : "disabled"}. You may need to refresh to see the effects.`,
	);
};

declare global {
	var setDebugMode: (active: boolean) => void;
}
globalThis.setDebugMode = setDebugMode;

export const getDebugMode = () => debugModeMemo ?? !!sessionStorage.getItem(APP.sessionKey);

type LoggerFunction = (...args: unknown[]) => void;
type LoggerGetter = (_: unknown, methodName: string | Symbol) => LoggerFunction;

const debugHandler: ProxyHandler<typeof console> = {
	get: (_: unknown, __: string | Symbol) => nullFn,
	set: () => {
		console.error("Attempts were made to write to a debug proxy. Someone did something exceptionally wrong.");
		return false;
	}
};
const nondebugHandler: ProxyHandler<typeof console> = {...debugHandler};

const nullFn: LoggerFunction = () => {};
const helloDebugFn: LoggerFunction = () => {
	console.info(
		`💡 ${APP.displayName} Developer Debug Mode logs are being generated. Activate Dev Debug Mode with %console.devebug = true%c to see them.`,
		"color: #080; font-style: italic;",
		"color: unset",
	);

	// After the first time, use the actual null function.
	debugHandler.get = () => nullFn;
};

const debugLogGetter: LoggerGetter = (_: unknown, methodName: string | Symbol) => {
	if (!(typeof methodName === "string" && console[methodName as keyof typeof console] instanceof Function)) {
		return (...args: unknown[]) => {
			console.warn("🐞⚠️ Attempt to call debug method, but no corresponding console method exists", {
				methodName,
				args
			});
		};
	}

	return (...args: unknown[]) => {
		if (["log", "debug", "info", "warning", "error"].includes(methodName)) args.unshift("🐞");
		(console[methodName as keyof typeof console] as (...args: unknown[]) => void)(...args);
	};
};

if (APP.available) {
	if (getDebugMode()) {
		console.info(
			`🐞 ${APP.displayName} debug mode is on. Use %csetDebugMode()%c to toggle it off.`,
			"color: #080; font-style: italic;",
			"color: unset",
		);

		debugHandler.get = debugLogGetter;
		nondebugHandler.get = () => nullFn;
	} else {
		debugHandler.get = () => helloDebugFn;
		nondebugHandler.get = debugLogGetter;
	}
}

export const debug: typeof console = new Proxy({} as typeof console, debugHandler);
export const nondebug: typeof console = new Proxy({} as typeof console, nondebugHandler);

export const debugLog = debug.log;
export const debugDebug = debug.debug;
export const debugInfo = debug.info;
export const debugWarn = debug.warn;
export const debugError = debug.error;

export const nondebugLog = nondebug.log;
export const nondebugDebug = nondebug.debug;
export const nondebugInfo = nondebug.info;
export const nondebugWarn = nondebug.warn;
export const nondebugError = nondebug.error;

export const init = (available: boolean = false, displayName: string, keyName: string): void => {
	APP.available = available;
	APP.displayName = displayName;
	APP.keyName = keyName;
};

export default debug;
