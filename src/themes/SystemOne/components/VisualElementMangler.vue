<script setup lang="ts">
const components = ["R", "G", "B"];
</script>

<template>
	<svg class="filters" width="1" height="1">
		<defs>
			<g id="dot50">
				<rect x="0" y="0" width="2" height="2" />
				<rect x="2" y="2" width="2" height="2" />
			</g>
			<g id="dot75">
				<rect x="0" y="0" width="2" height="2" />
				<rect x="4" y="2" width="2" height="2" />
			</g>
			<filter id="bw" x="0" y="0" width="100%" height="100%">
				<!-- Grayscale -->
				<feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0' in="SourceGraphic" result="grayscale" />

				<!-- Isolate black to black -->
				<feComponentTransfer in="grayscale" result="isolateBlack" color-interpolation-filters="sRGB">
					<template v-for="comp in components">
						<component :is="'feFunc' + comp" type="discrete" tableValues="0 1 1 1"></component>
					</template>
				</feComponentTransfer>

				<feComponentTransfer in="grayscale" result="isolateLight" color-interpolation-filters="sRGB">
					<template v-for="comp in components">
						<component :is="'feFunc' + comp" type="discrete" tableValues="1 1 0 1"></component>
					</template>
				</feComponentTransfer>

				<feComponentTransfer in="grayscale" result="isolateDark" color-interpolation-filters="sRGB">
					<template v-for="comp in components">
						<component :is="'feFunc' + comp" type="discrete" tableValues="1 0 1 1"></component>
					</template>
				</feComponentTransfer>

				<feComponentTransfer in="grayscale" result="isolateWhite" color-interpolation-filters="sRGB">
					<template v-for="comp in components">
						<component :is="'feFunc' + comp" type="discrete" tableValues="0 0 0 1"></component>
					</template>
				</feComponentTransfer>

				<feImage xlink:href="#dot75" result="dot75" width="8" height="4" />
				<feTile in="dot75" x="0" y="0" result="patt75" />
				<feComposite in="isolateLight" in2="patt75" operator="in" result="A" />

				<feImage xlink:href="#dot50" result="dot50" width="4" height="4" />
				<feTile in="dot50" x="0" y="0" result="patt50" />
				<feComposite in="isolateDark" in2="patt50" operator="in" result="B" />

				<feBlend in="A" in2="B" mode="multiply" result="AB"/>
				<feBlend in="AB" in2="isolateBlack" mode="multiply" result="ABK"/>
			</filter>
		</defs>
	</svg>
	<div :="$attrs" class="mangle">
		<slot/>
	</div>
</template>

<style scoped>
.filters {
	position: absolute;
	top: -999em;
	left: -999em;
}
.mangle, .grad {
	filter: url(#bw);
}
</style>