<script setup>
import halftones from "@/assets/shades/rgb-halftone-45.png";
</script>
<template>
	<svg width="0" height="0">
		<defs>
			<filter id="bwHalftoneFilter" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
				<feColorMatrix type="matrix" values="
				0.3333 0.3333 0.3333 0 0
				0.3333 0.3333 0.3333 0 0
				0.3333 0.3333 0.3333 0 0
				0 0 0 1 0" in="SourceGraphic" result="grayscale"/>
				<feComponentTransfer in="grayscale" result="isolated">
					<feFuncR type="discrete" tableValues="0 1 0 0 0"/>
					<feFuncG type="discrete" tableValues="0 0 1 0 0"/>
					<feFuncB type="discrete" tableValues="0 0 0 1 0"/>
				</feComponentTransfer>
				<feImage :href="halftones" width="16" height="16" result="shadesImage"/>
				<feTile in="shadesImage" result="shadesTile"/>
				<feBlend in="isolated" in2="shadesTile" mode="multiply" result="mids"/>
				<feColorMatrix type="matrix" values="
				1 1 1 0 0
				1 1 1 0 0
				1 1 1 0 0
				0 0 0 1 0" in="mids" result="midsToned"/>
				<feComponentTransfer in="grayscale" result="highs">
					<feFuncR type="discrete" tableValues="0 0 0 0 1"/>
					<feFuncG type="discrete" tableValues="0 0 0 0 1"/>
					<feFuncB type="discrete" tableValues="0 0 0 0 1"/>
				</feComponentTransfer>
				<feBlend in="midsToned" in2="highs" mode="screen" result="toned"/>
				<feComposite in="toned" in2="SourceAlpha" operator="in"/>
			</filter>
			<filter id="green" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
				<feFlood flood-color="#3f3"/>
				<feBlend in2="SourceGraphic" mode="multiply"/>
				<feComposite in2="SourceAlpha" operator="in"/>
			</filter>
			<filter id="amber" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
				<feFlood flood-color="#f81"/>
				<feBlend in2="SourceGraphic" mode="multiply"/>
				<feComposite in2="SourceAlpha" operator="in"/>
			</filter>
		</defs>
	</svg>
</template>