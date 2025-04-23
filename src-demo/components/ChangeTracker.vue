<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {randomString} from "@/util.ts";

const timestamp = () => randomString(3) + "-" + new Date().getTime().toString(32).slice(-3);

const runTime = timestamp();
const mountTimeRef = ref<string>("UNINITIALIZED");
const liveTimeRef = ref<string>("UNINITIALIZED");

onMounted(() => {
	mountTimeRef.value = timestamp();
});

const tickerRef = ref<number>(setInterval(() => {
	liveTimeRef.value = timestamp();
}, 100));

onUnmounted(() => {
	clearInterval(tickerRef.value);
	mountTimeRef.value = "OBSOLETE";
	liveTimeRef.value = "OBSOLETE";
})
</script>

<template>
	<table class="t">
		<thead><tr><th>Run</th><th>Mount</th><th>Live</th></tr></thead>
		<tbody><tr><td>{{ runTime }}</td><td>{{ mountTimeRef }}</td><td>{{ liveTimeRef }}</td></tr></tbody>
	</table>
</template>

<style scoped>
.t {
	border-collapse: collapse;
}
.t th, .t td {
	border: 1px solid black;
	padding: 0.2em;
	min-width: 9ch;
}
</style>