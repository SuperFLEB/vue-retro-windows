<script setup lang="ts">

import Window from "@int/components/Window/Window.vue";
import DemoContent from "@int/app/components/DemoContent.vue";
import type {MenuItemSpec} from "@int/components/Menu/types.ts";
import {MenuTypes} from "@int/components/Menu/MenuTypes.ts";
import {h} from "vue";

const actionClick = (message: string) => {
	alert(message);
};

const menuSpec: MenuItemSpec = {
	name: "root",
	type: MenuTypes.SUB,
	sub: [
		{
			name: "File",
			sub: [
				{
					name: "New",
					action: (_, __) => { actionClick('New'); }
				},
				{
					name: "Open...",
					action: (_, __) => { actionClick('Open...'); }
				},
				{
					name: "Move...",
					action: (_, __) => { actionClick('Move...'); }
				},
				{
					name: "Copy...",
					action: (_, __) => { actionClick('Copy...'); }
				},
				{
					name: "Delete",
					action: (_, __) => { actionClick('Delete...'); }
				},
				{
					name: "Properties...",
					action: (_, __) => { actionClick('Properties...'); }
				},
				{
					type: MenuTypes.SEPARATOR,
				},
				{
					name: "Run...",
					action: (_, __) => { actionClick('Run...'); }
				},
				{
					type: MenuTypes.SEPARATOR,
				},
				{
					name: "Exit Windows",
					action: (_, __) => { actionClick('Exit Windows'); }
				}
			]
		},
		{
			name: "Options",
			sub: [
				{
					name: "Auto Arrange",
					action: (_, __) => { actionClick('Auto Arrange'); }
				},
				{
					name: "Minimize on Use",
					action: (_, __) => { actionClick('Minimize on Use'); }
				},
				{
					name: "Save Settings on Exit",
					action: (_, __) => { actionClick('Save Settings on Exit'); }
				}
			]
		},
		{
			name: "Window",
			sub: [
				{
					name: "Cascade",
					action: (_, __) => { actionClick('Cascade'); }
				},
				{
					name: "Tile",
					action: (_, __) => { actionClick('Tile'); }
				},
				{
					name: "Arrange Icons",
					action: (_, __) => { actionClick('Arrange Icons'); }
				},
				{
					type: MenuTypes.SEPARATOR,
				},
				{
					name: "Close All",
					action: (_, __) => { actionClick('Close All'); }
				}
			]
		},
		{
			name: "Help",
			sub: [
				{
					name: "Help Topics",
					action: (_, __) => {
						actionClick('Help Topics');
					}
				},
				{
					name: "About Program Manager",
					action: (_, __) => {
						actionClick('About Program Manager');
					}
				}
			]
		},
		{
			name: "Now",
			sub: [
				{
					name: "Time",
					display: () => h('span', new Date().toString())
				}
			]
		}
	]
};

</script>

<template>
	<Window win-id="dc1896dc-11fb-414f-b1f5-1998a97623d2" :menu="menuSpec" :="$attrs">
		<p>This window has a menu on it, or it puts a menu on the desktop when it's focused (depending on the theme). Now, have some AI blather:</p>
		<DemoContent blather="lorem"></DemoContent>
	</Window>
</template>

<style scoped>

</style>