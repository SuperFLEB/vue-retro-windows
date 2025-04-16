<script lang="ts">
export default {
	name: 'Desktop (_Base)'
}
</script>

<template>
<div class="desktop"><slot /></div>
</template>

<style scoped>
.desktop {
	position: absolute;
	inset: 0;
	background-color: #333;
}
</style>