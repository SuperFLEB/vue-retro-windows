<script setup lang="ts">
import {charGrid} from "@/themes/Console/constants.ts";
import {onMounted, useTemplateRef} from "vue";
import dos437Unicode from "@/themes/Console/assets/DOS437Unicode.ts";

const densities = ["`" + `. - ':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tl`, `v)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9`, `C]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@`];
function getRowOfDensity(density: number, length: number = 200): string {
	const len = densities[density].length;
	return Array.from({length}).map(_ => densities[density][Math.random() * len | 0]).join("");
}

const idealTile = 500;
const tileWidth = Math.ceil(idealTile / charGrid.x) * charGrid.x;
const tileHeight = Math.ceil(idealTile / charGrid.y) * charGrid.y;

const canRef = useTemplateRef("canRef");
const imageRefs = {
	a: useTemplateRef("imageRefA"),
	b: useTemplateRef("imageRefB"),
	c: useTemplateRef("imageRefC")
};

onMounted(() => {
	dos437Unicode.load().then(_ => {
		const context = canRef.value!.getContext("2d")!;
		context.font = `${charGrid.x}px / ${charGrid.y}px Dos437 Unicode`;
		for (const [density, key] of ["a", "b", "c"].entries()) {
			context.fillStyle = "#000";
			context.fillRect(0, 0, tileWidth, tileHeight);
			context.fillStyle = "#f00";
			for (let rIdx = 0; rIdx < 100; rIdx++) {
				context.fillText(getRowOfDensity(Number(density)), 0, charGrid.y + rIdx * charGrid.y);
			}
			imageRefs[key].value?.setAttribute("xlink:href", canRef.value!.toDataURL("image/png"));
		}
	})
});

</script>

<template>
	<canvas :width="tileWidth" :height="tileHeight" ref="canRef" style="display: none"></canvas>
	<svg class="filters" width="0" height="0">
		<defs>
			<filter id="ascii" x="0" y="0" width="100%" height="100%">
				<!-- Shading images (characters) for each level of shading:
				     a: Low midtones, b: High midtones, c: Highlights -->
				<feImage ref="imageRefA" xlink:href="" x="0" y="0" :width="tileWidth" :height="tileHeight" result="imgA"/>
				<feImage ref="imageRefB" xlink:href="" x="0" y="0" :width="tileWidth" :height="tileHeight" result="imgB"/>
				<feImage ref="imageRefC" xlink:href="" x="0" y="0" :width="tileWidth" :height="tileHeight" result="imgC"/>

				<!-- Tile those over the whole visible area -->
				<feTile in="imgA" result="a" x="0" y="0"/>
				<feTile in="imgB" result="b" x="0" y="0"/>
				<feTile in="imgC" result="c" x="0" y="0"/>

				<!-- Make 1-character blocks of color -->
				<!-- Make a dot to sample color. There's a bit of "fudge factor" here to correct positioning. -->
				<feFlood :x="charGrid.x - 2" :y="charGrid.y + 6" height="2" width="2" in="SourceGraphic"
						 result="sampler"/>
				<!-- Space it out to 1ch size -->
				<feComposite in="" in2="sampler" operator="over" :width="charGrid.x" :height="charGrid.y"/>
				<!-- Tile it -->
				<feTile result="dots"/>

				<!-- Put in a black background. Otherwise, anything transparent gets rendered as all-channels-on. -->
				<feFlood flood-color="#000" result="background" />
				<feComposite in="SourceGraphic" in2="background" result="sourceGraphicWithBackground" />

				<!-- Composite the dots with the image to get 2x2 color "samples" -->
				<feComposite in="sourceGraphicWithBackground" in2="dots" operator="in" result="colordots"/>
				<!-- use feMorphology to spread the dots out into blocks -->
				<feMorphology operator="dilate" in="colordots" :radius="`${charGrid.x} ${charGrid.y}`" result="boxes"/>

				<!-- Color to grayscale -->
				<feColorMatrix in="boxes" result="shades" type="matrix" values="
					0.3333 0.3333 0.3333 0 0
					0.3333 0.3333 0.3333 0 0
					0.3333 0.3333 0.3333 0 0
					0      0      0      1 0"/>

				<!-- Map down to 9 colors -->
				<feComponentTransfer in="boxes" result="vivid">
					<feFuncR type="discrete" tableValues="0 .5 1"></feFuncR>
					<feFuncG type="discrete" tableValues="0 .5 1"></feFuncG>
					<feFuncB type="discrete" tableValues="0 .5 1"></feFuncB>
				</feComponentTransfer>

				<!-- Isolate different levels of gray to provide different shading.
				     Since I only need masks, I'm doing this with one feComponentTransfer and using channels individually -->
				<feComponentTransfer in="shades" result="grays">
					<!-- Red channel: Low midtones (are white, all others are black) -->
					<feFuncR type="discrete" tableValues="0 1 0 0"></feFuncR>
					<!-- Green channel: High midtones (are white, all others are black) -->
					<feFuncG type="discrete" tableValues="0 0 1 0"></feFuncG>
					<!-- Blue channel: Highlights (are white, all others are black) -->
					<feFuncB type="discrete" tableValues="0 0 0 1"></feFuncB>
				</feComponentTransfer>

				<!-- Now use feColorMatrix to pull out each channel from the above to its own grayscale -->
				<!-- Red/low midtones -->
				<feColorMatrix in="grays" result="grayA" type="matrix" values="
					1 0 0 0 0
					1 0 0 0 0
					1 0 0 0 0
					0 0 0 1 0
				"/>
				<!-- Green/high midtones -->
				<feColorMatrix in="grays" result="grayB" type="matrix" values="
					0 1 0 0 0
					0 1 0 0 0
					0 1 0 0 0
					0 0 0 1 0
				"/>
				<!-- Blue/highlights -->
				<feColorMatrix in="grays" result="grayC" type="matrix" values="
					0 0 1 0 0
					0 0 1 0 0
					0 0 1 0 0
					0 0 0 1 0
				"/>

				<!-- Combine the above (grayA/B/C) with the character/shading image (a/b/c).
				     Where "grayX" is white, "x" will show, displaying a character -->
				<feBlend in="a" in2="grayA" result="shadeA" mode="multiply"/>
				<feBlend in="b" in2="grayB" result="shadeB" mode="multiply"/>
				<feBlend in="c" in2="grayC" result="shadeC" mode="multiply"/>

				<!-- Combine the three into one image -->
				<feBlend in="shadeA" in2="shadeB" result="shadeAB" mode="screen"/>
				<feBlend in="shadeAB" in2="shadeC" result="shadeABC" mode="screen"/>

				<!-- Apply the color -->
				<feBlend in="vivid" in2="shadeABC" result="final" mode="hue"/>
			</filter>
		</defs>
	</svg>
	<div class="mangle">
		<slot/>
	</div>
</template>

<style scoped>
.filters {
	position: absolute;
	top: -999em;
	left: -999em;
}

.mangle {
	filter: url(#ascii) brightness(.80);
}
</style>