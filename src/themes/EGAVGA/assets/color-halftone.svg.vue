<script setup lang="ts">
import dither50 from "@/assets/shades/dither50.png";
import dither75 from "@/assets/shades/dither75.png";
</script>
<template>

	<svg class="filters" width="0" height="0">
		<defs>
			<filter id="colorHalftoneFilter" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
				<feImage :href="dither50" width="128" height="128" result="image50"/>
				<feImage :href="dither75" width="128" height="128" result="image75"/>

				<feComponentTransfer in="SourceGraphic" result="mid25">
					<feFuncR type="discrete" tableValues="0 1 0 0 0"/>
					<feFuncG type="discrete" tableValues="0 1 0 0 0"/>
					<feFuncB type="discrete" tableValues="0 1 0 0 0"/>
				</feComponentTransfer>
				<feComponentTransfer in="SourceGraphic" result="mid50">
					<feFuncR type="discrete" tableValues="0 0 1 0 0"/>
					<feFuncG type="discrete" tableValues="0 0 1 0 0"/>
					<feFuncB type="discrete" tableValues="0 0 1 0 0"/>
				</feComponentTransfer>
				<feComponentTransfer in="SourceGraphic" result="mid75">
					<feFuncR type="discrete" tableValues="0 0 0 1 0"/>
					<feFuncG type="discrete" tableValues="0 0 0 1 0"/>
					<feFuncB type="discrete" tableValues="0 0 0 1 0"/>
				</feComponentTransfer>
				<feComponentTransfer in="SourceGraphic" result="high">
					<feFuncR type="discrete" tableValues="0 0 0 0 1"/>
					<feFuncG type="discrete" tableValues="0 0 0 0 1"/>
					<feFuncB type="discrete" tableValues="0 0 0 0 1"/>
				</feComponentTransfer>
				<feColorMatrix in="image75" type="matrix" values="
                                             -1  0  0  0  1
                                              0 -1  0  0  1
                                              0  0 -1  0  1
                                              0  0  0  1  0" result="image25"/>
				<feTile in="image25" result="tile25"/>
				<feTile in="image50" result="tile50"/>
				<feTile in="image75" result="tile75"/>
				<feBlend in="tile25" in2="mid25" mode="multiply" result="color25"/>
				<feBlend in="tile50" in2="mid50" mode="multiply" result="color50"/>
				<feBlend in="tile75" in2="mid75" mode="multiply" result="color75"/>
				<feBlend in="color25" in2="color50" mode="screen" result="color25-50"/>
				<feBlend in="color25-50" in2="color75" mode="screen" result="color25-50-75"/>
				<feBlend in="color25-50-75" in2="high" mode="screen" result="color25-50-75-h"/>
				<feComposite in="color25-50-75-h" in2="SourceAlpha" operator="in"/>
			</filter>
		</defs>

	</svg>
</template>
