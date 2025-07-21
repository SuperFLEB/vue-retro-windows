<script setup lang="ts">
import {RwVisualMangler, RwWindow} from "@exp/components.ts";
import groceries from "./old-groceries.jpg";
import bubblegum from "./woman-in-sweater-with-bubblegum.jpg";

const images = [
	{
		image: groceries,
		title: "GROCERY",
		cite: "Old Groceries by FLEB (a.k.a. SuperFLEB)",
		link: "https://github.com/SuperFLEB",
	},
	{
		image: bubblegum,
		title: "BUBBLGUM",
		cite: "Woman In Sweater With Bubble Gum by Lucas Lagos",
		link: "https://www.pexels.com/photo/woman-in-sweater-with-bubblegum-11095789/",
	},
]
</script>

<template>
	<RwWindow v-for="(img, idx) in images" :x="50 + idx * 24" :y="50 + idx * 24" :width="600" :height="800" :title="`Image Viewer - (${img.title})`" :winId="`img-${img.title}`">
		<RwVisualMangler>
			<div class="images">
				<div><img class="image" alt="Sample Image, 20th Century Groceries" :src="img.image"/>
				</div>
				<div class="grad-bw"></div>
				<div class="grad-rgb"></div>
			</div>
		</RwVisualMangler>
		<p><a :href="img.link">{{img.cite}}</a></p>
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
