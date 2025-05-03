<script setup lang="ts">
import RwDesktopEnvironment from "@/components/RwDesktopEnvironment.vue";
import "@/util/style.mjs";
import type {ApplicationDefinition} from "@t/Application.js";

type Props = {
	rootSelector?: string | false,
	appSelector?: string | false,
	theme?: string,
	appId?: string,
	apps?: ApplicationDefinition[],
};
const props = withDefaults(defineProps<Props>(), {
	rootSelector: ":root, html, body",
	appSelector: "#app",
	theme: "fleb/threepointwin",
	appId: "main",
	apps: () => [],
});

</script>
<template>
	<RwDesktopEnvironment :theme :appId :apps>
		<slot/>
	</RwDesktopEnvironment>
	<component v-if="props.rootSelector" is="style">
		{{ props.rootSelector }} {
		margin: 0;
		padding: 0;
		background-color: #000;
		min-width: 100vw;
		min-height: 100vh;
		text-size-adjust: none;
		-moz-text-size-adjust: none;
		-webkit-text-size-adjust: none;
		overflow: hidden;
		}
		/*
		<template v-if="props.rootSelector.split(' ').includes('body')"> */
			body {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			}
			/*
		</template>
		*/
	</component>
	<component if="props.appSelector" is="style">
		{{ appSelector }} {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		}
	</component>
</template>
