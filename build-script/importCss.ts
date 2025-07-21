import MagicString from "magic-string";
import path from "node:path";
import type {RenderedChunk, ResolveIdResult, SourceMapInput} from "rollup";
import type {ResolvedConfig} from "vite";

let config: ResolvedConfig;

export default function importCss(exportName: string) {
	const filePath = path.resolve(`./${exportName ?? "UNKNOWN"}.css`);
	const cssFakeImport = "\0IMPORT-CSS-PLUGIN-RESOLVE-HERE";

	return {
		name: 'importCss',
		configResolved(resolvedConfig: ResolvedConfig) {
			config = resolvedConfig;
		},
		resolveId(id: string): ResolveIdResult {
			if (id === "[css]") {
				if (config.build.lib) {
					return {
						id: cssFakeImport,
						external: true,
						moduleSideEffects: true,
					};
				}
			}
			return id;
		},
		load(id: string): string | undefined {
			// This handles the dev server where renderChunk never happens and it actually tries to resolve the temporary import.
			// Since it's the dev server so the CSS gets included automatically we can just ignore the import entirely.
			if (id === "[css]") return "/* [css] import ignored */";
			if (id === cssFakeImport) return "/* CSS fake import ignored */";
		},
		renderChunk(code: string, chunk: RenderedChunk): { code: string; map?: SourceMapInput } | string | null {
			const s = new MagicString(code);
			if (code.includes(cssFakeImport)) {
				const chunkDir = path.dirname(chunk.fileName);
				const relativePath = path.relative(chunkDir, filePath);
				const normalizedPath = relativePath.split(path.sep).join('/');
				const prepended = normalizedPath.startsWith(".") ? normalizedPath : './' + normalizedPath;
				s.replaceAll(cssFakeImport, prepended);
				return {
					code: s.toString(),
					map: s.generateMap({ hires: true })
				};
			}
			return null;
		}
	};
}
