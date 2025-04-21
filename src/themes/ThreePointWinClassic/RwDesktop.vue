<script setup lang="ts">
import ThreePointWinRwDesktop from "../ThreePointWin/components/RwDesktop.vue";
const style = {
	"--highlightColor": "#108",
	"--winUIFontSize": "10pt",
	"--titleHeight": "1.8em",
	"--winUIFont": "SystemicDisassembly",
}
</script>
<template>
	<ThreePointWinRwDesktop :style><slot /></ThreePointWinRwDesktop>
</template>
<style src="./assets/SystemTrue.css"/>
<style src="./assets/SystemicDisassembly.css"/>
