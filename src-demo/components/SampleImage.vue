<script setup lang="ts">
import RwVisualMangler from "@exp/RwVisualMangler.vue";
</script>

<template>
	<RwVisualMangler>
		<div class="images">
			<div><img class="image" alt="Sample Image, 20th Century Groceries" src="../assets/SampleImage.jpg" /></div>
			<div class="grad-bw"></div>
			<div class="grad-rgb"></div>
		</div>
	</RwVisualMangler>
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
