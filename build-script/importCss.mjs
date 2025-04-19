import MagicString from "magic-string";
import path from "node:path";

export default function importCssPlugin({ exportName, path: cssFilePath }) {
	const filePath = path.resolve(exportName ? `./${exportName}.css` : cssFilePath);
	const cssPathKey = "/*TEMPORARY_IMPORT_INDICATOR:" + path.normalize(filePath).replaceAll("\\", "/") + "*/";
	return {
		name: 'importCss',
		resolveId(id) {
			if (id === "[css]") {
				return {
					id: cssPathKey,
					external: true,
					moduleSideEffects: true,
				};
			}
			return id;
		},
		renderChunk(code, chunk) {
			const ms = new MagicString(code);
			if (code.includes(cssPathKey)) {
				const chunkDir = path.dirname(chunk.fileName);
				const relativePath = path.relative(chunkDir, filePath);
				const normalizedPath = relativePath.split(path.sep).join('/');
				const prepended = normalizedPath.startsWith(".") ? normalizedPath : './' + normalizedPath;
				ms.replaceAll(cssPathKey, prepended);
				return {
					code: ms.toString(),
					map: ms.generateMap({ hires: true })
				};
			}
			return null;
		}
	};
}
