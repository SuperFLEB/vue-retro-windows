import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "node:path";
import {globSync} from "tinyglobby";
import importCss from "./build-script/importCss.mjs";

const typeGlobs = ["./src/**/*.ts", "./src/**/*.tsx", "./src/**/*.vue", "./src/**/*.mjs", "./src/**/*.js"];

function globject(glob: string[]) {
	return Object.fromEntries(
		globSync(glob).map(file => [
			path.relative(
				"./src",
				file.slice(0, file.length - path.extname(file).length)
			).replace(/\\/, "/"),
			path.resolve(file)
		])
	);
}

const entries = globject(typeGlobs);
const CSS_NAME = "retrowin-vue";

export default defineConfig(({command}) => (
	{
		appType: "mpa", // disable history fallback
		plugins: [vue(), importCss(CSS_NAME)],
		build: {
			assetsInlineLimit: 0,
			minify: false,
			target: "es2020",
			lib: {
				entry: entries,
				cssFileName: CSS_NAME,
				formats: ["es"],
				fileName: (format, entryName) => {
					const baseName = entryName.replace(/\.(vue|ts|tsx)$/, "");
					return `${format}/${baseName}.mjs`;
				},
				name: "retrowindow",
			},
			rollupOptions: {
				output: {
					chunkFileNames: (chunkInfo) => {
						const match = chunkInfo.moduleIds[0].match(/^(.+[/\\]([^?/\\]+))\.[^.?]*\?.*$/);
						if (!match) return chunkInfo.name + ".mjs";
						const outPath = path.relative("./src", match[1]);
						return outPath + ".mjs";
					},
					entryFileNames: `[name].mjs`,
					manualChunks: (id) => {
						const rel = path.relative(".", id);
						if (/^(\.?\/?)node_modules[\\/]/.test(rel)) {
							return rel.replace(/^node_modules/, "vendor");
						}
					}
				},
				external: ["vue"],
			}
		},
		resolve: {
			preserveSymlinks: true,
			alias: [
				{find: "@", replacement: path.resolve(__dirname, "./src")},
				{find: "@exp", replacement: path.resolve(__dirname, "./src/exported")},
				{find: "@apps", replacement: path.resolve(__dirname, "./src/apps")},
				{find: "@t", replacement: path.resolve(__dirname, "./src/types")},
				{find: "@themes", replacement: path.resolve(__dirname, "./src/themes")},
			],
		}
	})
);

