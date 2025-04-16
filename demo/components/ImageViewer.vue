<script setup lang="ts">
import Themed from "@int/components/ThemeProvider/Themed.vue";
type Props = { src: string };
const props = defineProps<Props>();
</script>

<template>
	<Themed is="VisualElementMangler">
		<div class="images">
			<div><img class="image" :src="props.src" /></div>
			<div class="grad-bw"></div>
			<div class="grad-rgb"></div>
		</div>
	</Themed>
</template>

<style scoped>
.images {
	display: inline-block;
}
.image {
	flex-grow: 0;
}
.grad-bw, .grad-rgb {
	height: 30px;
}
.grad-bw {
	background: linear-gradient(to right, #000, #fff);
}
.grad-rgb {
	background: linear-gradient(to right in hsl longer hue, red, blueviolet);
}
</style>
