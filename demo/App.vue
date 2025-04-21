<script setup lang="ts">
import {RwApplication, RwWindow} from "@exp";
import {AboutApp, ThemePicker} from "@apps";
import ChangeTracker from "./components/ChangeTracker.vue";
import DemoContent from "./components/DemoContent.vue";
import SampleImage from "./components/SampleImage.vue";

function link(url: string) {
	window.open(url, "_blank");
}

const aboutMenu = {
	name: "AboutRoot",
	sub: [
		{
			name: "About",
			sub: [
				{
					name: "GitHub Page",
					action: () => link("https://github.com/SuperFLEB/vue-retro-windows")
				},
				{
					name: "Issues",
					action: () => link("https://github.com/SuperFLEB/vue-retro-windows/issues")
				},
				{
					name: "More from SuperFLEB",
					action: () => link("https://github.com/SuperFLEB")
				},
			]
		}
	]
}
</script>

<template>
	<RwApplication theme="fleb/threepointwin">
		<RwWindow title="Theme Picker" :x=0 :width="300" :height="300" winId="916ce28c-f868-4869-8053-13446dd86560">
			<ThemePicker/>
		</RwWindow>
		<RwWindow win-id="0a93e6e1-590e-4933-91fd-11c68ea5e382" :x="0" :y="400" :width="600" :height="200" title="Change Tracker">
			<p>This table shows values that change when run, mounted, and on a timer. It can be used to determine whether/when the component was remounted.</p>
			<ChangeTracker />
		</RwWindow>
		<RwWindow win-id="a5437122-e83f-4980-a41c-2e8ded9b0122" :x="400" :y="0" :width="600" :height="800" title="AI Blather">
			<DemoContent />
		</RwWindow>
		<RwWindow win-id="4c32f63e-635f-46fe-b962-8474e502d64c" :x="470" :y="70" :width="600" :height="800" title="Sample Image">
			<SampleImage />
		</RwWindow>
		<RwWindow :x="150" :y="50" :width="800" :height="800" title="About" win-id="dace5a00-4e21-4375-9e3c-0f44629528df" :menu="aboutMenu">
			<AboutApp/>
		</RwWindow>
	</RwApplication>
</template>
