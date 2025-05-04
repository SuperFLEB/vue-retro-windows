<script setup lang="ts">
import {DefaultApp} from "@apps";

import AboutAppDef from "@apps/About/def.js";
import ThemePickerDef from "@apps/ThemePicker/def";

import * as Themed from "@/themed/index";

import BlatherDef from "./apps/Blather/Blather.def";
import SampleImageDef from "./apps/SampleImage/SampleImage.def.ts";
import ChangeTrackerDef from "./apps/ChangeTracker/ChangeTracker.def.ts";
</script>

<template>
	<DefaultApp theme="fleb/threepointwin">
		<Themed.RwFolderSpace context="desktop">
			<Themed.RwLauncher :launch="AboutAppDef"/>
			<Themed.RwLauncher :launch="ThemePickerDef"/>
			<Themed.RwLauncher :launch="SampleImageDef"/>
			<Themed.RwLauncher :launch="BlatherDef"/>
			<Themed.RwLauncher :launch="ChangeTrackerDef"/>
		</Themed.RwFolderSpace>
	</DefaultApp>
</template>
