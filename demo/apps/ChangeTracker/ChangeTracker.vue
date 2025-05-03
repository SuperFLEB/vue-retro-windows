<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {randomString} from "@/util.ts";
import RwWindow from "@/components/Window/RwWindow.vue";

const timestamp = () => randomString(3) + "-" + new Date().getTime().toString(32).slice(-3);

const runTime = timestamp();
const mountTimeRef = ref<string>("UNINITIALIZED");
const liveTimeRef = ref<string>("UNINITIALIZED");
const liveTitleRef = ref<string>("UNINITIALIZED");

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
});
</script>

<template>
	<RwWindow win-id="main" :width="400" :height="200" :title="`Change Tracker (${liveTimeRef})`">
		<table class="t">
			<thead>
			<tr>
				<th>Run</th>
				<th>Mount</th>
				<th>Live</th>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td>{{ runTime }}</td>
				<td>{{ mountTimeRef }}</td>
				<td>{{ liveTimeRef }}</td>
			</tr>
			</tbody>
		</table>
	</RwWindow>
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