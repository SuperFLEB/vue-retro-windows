export default function uuid(native: boolean = true) {
	if (native === true && globalThis.isSecureContext) {
		return globalThis.crypto.randomUUID();
	}
	const buf = new Uint8Array(16);
	globalThis.crypto.getRandomValues(buf);
	let uuid = "";
	const dashes = [10, 8, 6, 4];
	for (const [idx, byte] of buf.entries()) {
		uuid += ("0" + byte.toString(16)).slice(-2);
		if (idx === dashes[0]) {
			dashes.pop();
			uuid += "-";
		}
	}
}
