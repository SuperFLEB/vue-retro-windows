import type {WinUid, WinManRegistry} from "@t/WinMan.ts";

/**
 * Rearrange windows' z-index to shift the targeted window to the front.
 * This will mutate the given WinManRegistry.
 * @param registry
 * @param uid
 * @returns void
 */
export const unshiftZ = (registry: WinManRegistry, uid: WinUid) => {
	const keys = Object.keys(registry);
	const total = keys.length;
	keys.sort((a, b) => registry[a].z - registry[b].z);
	let gap = 0;

	keys.forEach((key, idx) => {
		registry[key].z = key === uid.toString() ? total - ++gap : idx - gap;
	});

	return;
};
