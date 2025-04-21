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

<style src="../assets/DOS437Unicode.scss" lang="scss" />
<style scoped lang="scss">
:root {
	overflow: hidden;
}

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

.themed {
	button, input[type=button] {
		color: #000;
		font: inherit;
		background-color: #ccc;
		border: 1px outset #fff;
		padding: 0.5em 1em;

		&, &:focus, &:active {
			outline: none;
		}

		&:focus {
			background-color: #888;
			color: #fff;
		}
	}

	input[type=radio] {
		appearance: none;
		font: inherit;
		line-height: inherit;

		position: relative;
		padding-block: 0;
		padding-inline: 0;
		margin-block: 0;
		margin-inline: 0;
		margin-inline-end: 1ch;

		&::before {
			display: inline-block;
			width: 1ch;
			height: 1ch;
			border: 2px inset #fff;
			background-color: #fff;
			border-radius: 50%;
			content: "\00A0";
		}

		&:checked::after {
			content: "";
			width: 0.8ch;
			height: 0.8ch;
			background-color: #000;
			border-radius: 50%;
			content: "\00A0";
			display: block;
			position: absolute;
			left: calc(0.45ch - 1px);
			top: calc(.45ch - 1px);
			display: inline-block;
		}
	}
}
</style>