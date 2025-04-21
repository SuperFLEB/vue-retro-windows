<script setup lang="ts">
import RwApplication from "@/components/RwApplication.vue";
import "@/util/style.mjs";

type Props = { rootSelector?: string | false, appSelector?: string | false, theme?: string };
const props = withDefaults(defineProps<Props>(), {
	rootSelector: ":root, html, body",
	appSelector: "#app",
	theme: "fleb/threepointwin",
});
</script>
<template>
	<RwApplication :theme>
		<slot/>
	</RwApplication>
	<component v-if="props.rootSelector" is="style">
		{{ rootSelector }} {
		margin: 0;
		padding: 0;
		background-color: #000;
		min-width: 100vw;
		min-height: 100vh;
		text-size-adjust: none;
		-moz-text-size-adjust: none;
		-webkit-text-size-adjust: none;
		}
		body {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		}
	</component>
	<component if="props.appSelector" is="style">
		{{ appSelector }} {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		}
	</component>
</template>
