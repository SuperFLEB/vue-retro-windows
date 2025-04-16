<script setup lang="ts">
import Window from "@/components/Window.vue";
import Application from "@/components/Application.vue";
import ThemePicker from "@/components/ThemePicker.vue";
import WelcomeWindow from "./components/WelcomeWindow.vue";
</script>

<template>
	<Application theme="fleb/threepointwin">
		<Window title="Theme Chooser" :x=400 :width="300" winId="916ce28c-f868-4869-8053-13446dd86560">
			<ThemePicker/>
		</Window>
		<WelcomeWindow/>
		<!--
					<Window title="AI blather" winId="7cbcbd32-f905-4236-98cd-4a3bf0695ed6">
						<DemoContent blather="lorem"/>
					</Window>
					<Window title="More AI blather" :x="200" winId="4cbd692d-6701-4b53-a472-ad201902a597">
						<DemoContent blather="history"/>
					</Window>
					<Window winId="c2fb499c-6214-462e-abf6-895eb76f8a01" title="MDI Parent" :x="100" :y="400" :width="400" :height="400">
						<template #subWindows>
							<Window winId="469b7317-bc29-4f44-8d1a-ecb1cf016ac7" title="MDI Child">
								Hello child.
							</Window>
						</template>
					</Window>

					<MenuWindow title="Menu Window"></MenuWindow>
					<Window title="Change Tracker" winId="740f170f-b220-4d35-9d4a-264db55796d4">
						<ChangeTracker />
					</Window>
					<Window winId="82e27ab8-fad3-4d09-95c5-cc7045096792" title="Some form" :width="800" :height="400">
						<SomeForm />
					</Window>
					<Window winId="829702bf-211d-48a8-94f2-91a2841a9983" title="Image Viewer">
						<ImageViewer src="https://i.imgur.com/IjcTFdt.jpeg" />
					</Window>
		-->
	</Application>
</template>

<style scoped>
</style>
