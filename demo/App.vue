<script setup lang="ts">
import Window from "@/exported/Window.vue";
import Application from "@/exported/Application.vue";
import ThemePicker from "@/exported/ThemePicker.vue";
import WelcomeWindow from "./components/WelcomeWindow.vue";
</script>

<template>
	<Application theme="fleb/threepointwin">
		<Window title="Theme Chooser" :x=400 :width="300" winId="916ce28c-f868-4869-8053-13446dd86560">
			<ThemePicker/>
		</Window>
		<WelcomeWindow/>

	</Application>
</template>
