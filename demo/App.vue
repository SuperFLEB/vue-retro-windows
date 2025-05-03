<script setup lang="ts">
import {DefaultApp} from "@apps";

import AboutAppDef from "@apps/About/def.js";
import ThemePickerDef from "@apps/ThemePicker/def";

import * as Themed from "@/themed/index";

import BlatherDef from "./apps/Blather/Blather.def";
import SampleImageDef from "./apps/SampleImage/SampleImage.def.ts";
</script>

<template>
	<DefaultApp theme="fleb/threepointwin">
		<Themed.RwFolderSpace context="desktop">
			<Themed.RwLauncher :app="AboutAppDef"/>
			<Themed.RwLauncher :app="ThemePickerDef"/>
			<Themed.RwLauncher :app="SampleImageDef"/>
			<Themed.RwLauncher :app="BlatherDef"/>
		</Themed.RwFolderSpace>
	</DefaultApp>
</template>
