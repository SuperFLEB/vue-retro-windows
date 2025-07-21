<script setup lang="ts">
import {charGrid} from "../constants.ts";
import {onMounted, useTemplateRef} from "vue";
import dos437Unicode from "../assets/DOS437Unicode.ts";
import useRoundedSize from "@themes/Console/components/LockedScrollPane/useRoundedSize.ts";

const densities = ["`" + `. - ':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tl`, `v)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9`, `C]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@`];
function getRowOfDensity(density: number, length: number = 200): string {
	const len = densities[density].length;
	return Array.from({length}).map(_ => densities[density][Math.random() * len | 0]).join("");
}

const idealTile = 500;
const tileWidth = Math.ceil(idealTile / charGrid.x) * charGrid.x;
const tileHeight = Math.ceil(idealTile / charGrid.y) * charGrid.y;

const canRef = useTemplateRef("can");
const imageRefs = {
	a: useTemplateRef("imageA"),
	b: useTemplateRef("imageB"),
	c: useTemplateRef("imageC")
};

useRoundedSize(useTemplateRef("mangle"), charGrid.x, charGrid.y);

onMounted(() => {
	dos437Unicode.load().then(_ => {
		const context = canRef.value!.getContext("2d")!;
		context.font = `${charGrid.x}px / ${charGrid.y}px Dos437Unicode`;
		for (const [density, key] of (["a", "b", "c"] as const).entries()) {
			context.fillStyle = "#000";
			context.fillRect(0, 0, tileWidth, tileHeight);
			context.fillStyle = "#f00";
			for (let rIdx = 0; rIdx < 100; rIdx++) {
				context.fillText(getRowOfDensity(Number(density)), 0, charGrid.y + rIdx * charGrid.y - 3);
			}
			imageRefs[key].value?.setAttribute("xlink:href", canRef.value!.toDataURL("image/png"));
		}
	})
});

</script>

<template>
	<div class="mangle" ref="mangle"><slot/></div>
	<canvas :width="tileWidth" :height="tileHeight" ref="can" style="display: none"></canvas>
	<svg class="filters" width="0" height="0">
		<defs>
			<filter id="ascii" x="0" y="0" width="100%" height="100%">
				<feImage ref="imageA" xlink:href="" x="0" y="0" :width="tileWidth" :height="tileHeight" result="imgA"/>
				<feImage ref="imageB" xlink:href="" x="0" y="0" :width="tileWidth" :height="tileHeight" result="imgB"/>
				<feImage ref="imageC" xlink:href="" x="0" y="0" :width="tileWidth" :height="tileHeight" result="imgC"/>

				<feTile in="imgA" result="a" x="0" y="0"/>
				<feTile in="imgB" result="b" x="0" y="0"/>
				<feTile in="imgC" result="c" x="0" y="0"/>

				<feFlood :x="charGrid.x - 2" :y="charGrid.y + 6" height="2" width="2" in="SourceGraphic"
						 result="sampler"/>
				<feComposite in="" in2="sampler" operator="over" :width="charGrid.x" :height="charGrid.y"/>
				<feTile result="dots"/>
				<feFlood flood-color="#000" result="background" />
				<feComposite in="SourceGraphic" in2="background" result="sourceGraphicWithBackground" />
				<feComposite in="sourceGraphicWithBackground" in2="dots" operator="in" result="colordots"/>
				<feMorphology operator="dilate" in="colordots" :radius="`${charGrid.x} ${charGrid.y}`" result="boxes"/>
				<feColorMatrix in="boxes" result="shades" type="matrix" values="
					0.3333 0.3333 0.3333 0 0
					0.3333 0.3333 0.3333 0 0
					0.3333 0.3333 0.3333 0 0
					0      0      0      1 0"/>
				<feComponentTransfer in="boxes" result="vivid">
					<feFuncR type="discrete" tableValues="0 .5 1"></feFuncR>
					<feFuncG type="discrete" tableValues="0 .5 1"></feFuncG>
					<feFuncB type="discrete" tableValues="0 .5 1"></feFuncB>
				</feComponentTransfer>
				<feComponentTransfer in="shades" result="grays">
					<feFuncR type="discrete" tableValues="0 1 0 0"></feFuncR>
					<feFuncG type="discrete" tableValues="0 0 1 0"></feFuncG>
					<feFuncB type="discrete" tableValues="0 0 0 1"></feFuncB>
				</feComponentTransfer>
				<feColorMatrix in="grays" result="grayA" type="matrix" values="
					1 0 0 0 0
					1 0 0 0 0
					1 0 0 0 0
					0 0 0 1 0
				"/>
				<feColorMatrix in="grays" result="grayB" type="matrix" values="
					0 1 0 0 0
					0 1 0 0 0
					0 1 0 0 0
					0 0 0 1 0
				"/>
				<feColorMatrix in="grays" result="grayC" type="matrix" values="
					0 0 1 0 0
					0 0 1 0 0
					0 0 1 0 0
					0 0 0 1 0
				"/>
				<feBlend in="a" in2="grayA" result="shadeA" mode="multiply"/>
				<feBlend in="b" in2="grayB" result="shadeB" mode="multiply"/>
				<feBlend in="c" in2="grayC" result="shadeC" mode="multiply"/>
				<feBlend in="shadeA" in2="shadeB" result="shadeAB" mode="screen"/>
				<feBlend in="shadeAB" in2="shadeC" result="shadeABC" mode="screen"/>
				<feBlend in="vivid" in2="shadeABC" result="final" mode="hue"/>
			</filter>
		</defs>
	</svg>
</template>

<style scoped>
.filters {
	position: absolute;
	top: -999em;
	left: -999em;
}

.mangle {
	filter: url(#ascii) brightness(.8);
}
</style>