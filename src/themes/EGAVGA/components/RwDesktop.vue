<script setup lang="ts">
import {randomString} from "@/util.ts";

const filterId = randomString(5, "lores");

const stepCount = 32;
const steps = Array(stepCount)
	.fill(null)
	.map((_, i) => (i / stepCount).toFixed(4))
	.join(" ");

const tightTable = "0 .05 .95 1";

</script>

<template>
	<div class="desktop" :style="{'--filter-url': `url(#${filterId})`}">
		<slot/>
	</div>
	<svg>
		<defs>
			<filter id={filterId}>
				<feComponentTransfer in="SourceGraphic" result="A" color-interpolation-filters="sRGB">
					<feFuncB type="discrete" :tableValues="steps"/>
				</feComponentTransfer>
				<feTurbulence result="noise" type="fractalNoise" baseFrequency=".7" numOctaves="2"/>
				<feComponentTransfer in="noise" result="C" color-interpolation-filters="linearRGB">
					<feFuncR type="table" :tableValues="tightTable"/>
					<feFuncG type="table" :tableValues="tightTable"/>
					<feFuncB type="table" :tableValues="tightTable"/>
				</feComponentTransfer>
				<feDisplacementMap in="A" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G"/>
			</filter>
		</defs>
	</svg>
</template>

<style src="../assets/DOS437Unicode.scss" lang="scss"/>
<style scoped lang="scss">
@use "../_html.scss" as html;

.desktop, .desktop::before {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}

.desktop::before {
	filter: var(--filter-url);
	background-image: linear-gradient(45deg, #000, #00c 100%);
	content: " ";
	top: -30px;
	bottom: -30px;
	left: -30px;
	right: -30px;
}

.desktop:deep() {
	@include html.themed;
}
</style>