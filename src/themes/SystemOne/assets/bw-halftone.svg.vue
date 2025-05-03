<script setup>
import dither from "@/assets/shades/rgb-17-33-50.png";
</script>
<template>

	<svg class="filters" width="0" height="0">
		<defs>
			<filter id="bwHalftoneFilter" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
				<feImage :href="dither" width="128" height="128" result="btmShadesImage" />

				<feColorMatrix type="matrix" values="
				0.3333 0.3333 0.3333 0 0
				0.3333 0.3333 0.3333 0 0
				0.3333 0.3333 0.3333 0 0
				0 0 0 1 0" in="SourceGraphic" result="grayscale" />
				<feComponentTransfer in="grayscale" result="isolatedPos">
					<feFuncR type="discrete" tableValues="0 1 0 0 0 0 0" />
					<feFuncG type="discrete" tableValues="0 0 1 0 0 0 0" />
					<feFuncB type="discrete" tableValues="0 0 0 1 0 0 0" />
				</feComponentTransfer>
				<feComponentTransfer in="grayscale" result="isolatedNeg">
					<feFuncR type="discrete" tableValues="0 0 0 0 0 1 0" />
					<feFuncG type="discrete" tableValues="0 0 0 0 1 0 0" />
				</feComponentTransfer>
				<feColorMatrix type="matrix" values="
				-1  0  0  0 1
				 0 -1  0  0 1
				 0  0 -1  0 1
				 0  0  0  1 0" in="btmShadesImage" result="topShadesImage" />
				<feTile in="btmShadesImage" result="btmShadesTile" />
				<feTile in="topShadesImage" result="topShadesTile" />
				<feBlend in="isolatedPos" in2="btmShadesTile" mode="multiply" result="btmMids" />
				<feBlend in="isolatedNeg" in2="topShadesTile" mode="multiply" result="topMids" />
				<feColorMatrix type="matrix" values="
				1 1 1 0 0
				1 1 1 0 0
				1 1 1 0 0
				0 0 0 1 0" in="btmMids" result="btmMidsToned" />
				<feColorMatrix type="matrix" values="
				1 1 1 0 0
				1 1 1 0 0
				1 1 1 0 0
				0 0 0 1 0" in="topMids" result="topMidsToned" />
				<feComponentTransfer in="grayscale" result="highs">
					<feFuncR type="discrete" tableValues="0 0 0 0 0 0 1" />
					<feFuncG type="discrete" tableValues="0 0 0 0 0 0 1" />
					<feFuncB type="discrete" tableValues="0 0 0 0 0 0 1" />
				</feComponentTransfer>
				<feBlend in="topMidsToned" in2="highs" mode="screen" result="tops" />
				<feBlend in="btmMidsToned" in2="tops" mode="screen" result="mids" />
				<feComposite in="mids" in2="SourceAlpha" operator="in" />
			</filter>
		</defs>
	</svg>

</template>