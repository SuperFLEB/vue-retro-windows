<script setup lang="ts">
type Props = { name: string, themeName: string };
const props = defineProps<Props>();

console.error("Failed component");
</script>

<template>
	<div class="failedComponent" :title="`Component ${props.name} failed to load in theme ${themeName}`">
		<span class="failed-message">
			<span class="a">⁉️</span>
			<span class="b">🧩</span>
		</span>
	</div>
	<slot />
</template>

<style scoped>
	.failedComponent {
		display: inline-block;
		width: 2em;
		text-align: center;
		border: 2px dashed #f00;
		border-radius: 25%;
	}
	@keyframes flash {
		0% { opacity: 100%; width: 2em; }
		25% { opacity: 0;}
		50% { width: 0;}
	}

	.a, .b {
		display: inline-block;
		width: 0;
		opacity: 0;
		animation-name: flash;
		animation-duration: 4s;
		animation-iteration-count: infinite;
		animation-timing-function: steps(1);
		cursor: help;
	}

	.b {
		animation-delay: 2s;
	}
</style>