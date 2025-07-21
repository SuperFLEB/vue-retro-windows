import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import {defineConfig} from "eslint/config";


export default defineConfig([
	{files: ["src/**/*.{js,mjs,cjs,ts,mts,cts,vue}"], plugins: {js}, extends: ["js/recommended"]},
	{files: ["src/**/*.{js,mjs,cjs,ts,mts,cts,vue}"], languageOptions: {globals: globals.browser}},
	{
		files: ["src/**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			'@typescript-eslint/no-unused-vars': ['warn', {
				caughtErrors: 'none',
				argsIgnorePattern: "^_+$",
				varsIgnorePattern: "^_+$",
			}],
		},
		extends: tseslint.configs.recommended
	},
	{files: ["src/**/*.{js,mjs,cjs,ts,mts,cts,vue}"], extends: pluginVue.configs["flat/essential"]},
	{files: ["src/**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
	{files: ["src/**!/!*.json"], plugins: {json}, language: "json/json", extends: ["json/recommended"]},
	{files: ["src/**!/!*.jsonc"], plugins: {json}, language: "json/jsonc", extends: ["json/recommended"]},
	{files: ["src/**!/!*.json5"], plugins: {json}, language: "json/json5", extends: ["json/recommended"]},
	{files: ["src/**!/!*.md"], plugins: {markdown}, language: "markdown/gfm", extends: ["markdown/recommended"]},
	{files: ["src/**!/!*.css"], plugins: {css}, language: "css/css", extends: ["css/recommended"]},
]);
