<script setup lang="ts">
import {DefaultApp} from "@apps";
import RwLauncher from "@/components/Launcher/RwLauncher.vue";
import LauncherIcon from "@/components/Launcher/LauncherIcon.vue";
import RwFolderSpace from "@/components/FolderSpace/RwFolderSpace.vue";
import AboutAppDef from "@apps/About/def.js";
import ThemePickerDef from "@apps/ThemePicker/def";
import BlatherDef from "./apps/Blather/Blather.def";
import SampleImageDef from "./apps/SampleImage/SampleImage.def.ts";
</script>

<template>
	<DefaultApp theme="fleb/threepointwin">
		<RwFolderSpace context="desktop">
			<RwLauncher :app="AboutAppDef"/>
			<RwLauncher :app="ThemePickerDef"/>
			<RwLauncher :app="SampleImageDef"/>
			<RwLauncher :app="BlatherDef"/>
		</RwFolderSpace>
	</DefaultApp>
</template>
