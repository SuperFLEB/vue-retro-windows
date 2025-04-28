export default function valueFrom<T>(thing: T | ((...p: any[]) => T), ...params: any[]): T {
	if (typeof thing === "function") {
		return (thing as (() => T))(...params as []);
	}
	return thing as T;
}