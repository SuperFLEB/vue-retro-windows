<script setup lang="ts">
import RwVisualMangler from "@exp/RwVisualMangler.vue";
import RwWindow from "@/components/Window/RwWindow.vue";
import sampleImage from "./SampleImage.jpg";
</script>

<template>
	<RwWindow :x="50" :y="50" :width="600" :height="800" title="Sample Image" winId="main">
		<RwVisualMangler>
			<div class="images">
				<div><img class="image" alt="Sample Image, 20th Century Groceries" height="900" :src="sampleImage"/>
				</div>
				<div class="grad-bw"></div>
				<div class="grad-rgb"></div>
			</div>
		</RwVisualMangler>
	</RwWindow>
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
