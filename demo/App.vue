<script setup lang="ts">
import DefaultApp from "@/exported";

import {RwFolderSpace, RwLauncher} from "@exp/components.ts";

import AboutAppDef from "@/apps/About";
import ThemePickerDef from "@/apps/ThemePicker";

import BlatherDef from "./apps/Blather/Blather.def";
import SampleImageDef from "./apps/SampleImage/SampleImage.def.ts";
import ChangeTrackerDef from "./apps/ChangeTracker/ChangeTracker.def.ts";
import RegistrationFormDef from "./apps/RegistrationForm/RegistrationForm.def.ts";
</script>

<template>
	<DefaultApp theme="fleb/threepointwin/classic">
		<RwFolderSpace context="desktop">
			<RwLauncher :launch="AboutAppDef"/>
			<RwLauncher :launch="ThemePickerDef"/>
			<RwLauncher :launch="SampleImageDef"/>
			<RwLauncher :launch="BlatherDef"/>
			<RwLauncher :launch="ChangeTrackerDef"/>
			<RwLauncher :launch="RegistrationFormDef"/>
		</RwFolderSpace>
	</DefaultApp>
</template>
