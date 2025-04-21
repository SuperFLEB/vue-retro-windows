<template>
	<div class="desktop"><slot /></div>
</template>

<style src="../assets/SystemTrue.css" />
<style src="../assets/SystemicDisassembly.css" />
<style scoped lang="scss">
@use "../_html.scss" as h;
.desktop {
	position: relative;
	flex-grow: 1;
	inset: 0;
	background-color: #048;

	&:deep() {
		@include h.themed;
	}
}
</style>