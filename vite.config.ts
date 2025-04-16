import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "node:path";

// https://vite.dev/config/
export default defineConfig({
	appType: "mpa", // disable history fallback
	plugins: [vue()],
	build: {
		assetsInlineLimit: 0,
		lib: {

		}
	},
	resolve: {
		preserveSymlinks: true,
		alias: [
			{find: "@", replacement: path.resolve(__dirname, "./src")},
			{find: "@t", replacement: path.resolve(__dirname, "./src/types")},
			{find: "@int", replacement: path.resolve(__dirname, "./src/internal")},
			{find: "@themes", replacement: path.resolve(__dirname, "./src/themes")},
		],
	}
});
