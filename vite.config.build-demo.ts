import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import importCss from "./build-script/importCss.mjs";
import path from "node:path";

const CSS_NAME = "retrowin-vue";

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), importCss({exportName: CSS_NAME})],
	base: "./",
	build: {
		assetsInlineLimit: 0,
		// for GitHub Pages
		outDir: "docs/",
		minify: true,
		target: "es2020",
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
