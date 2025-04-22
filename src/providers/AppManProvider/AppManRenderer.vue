<script setup lang="ts">
import useAppMan from "@/providers/AppManProvider/useAppMan.js";
import {computed} from "vue";

const { instances, interface: appManIntf } = useAppMan();

const componentsWithInstanceData = computed(() => {
	const entriesOut = [];
	for (const inst of instances.value.values()) {
		entriesOut.push([appManIntf.getComponent(inst.appId), inst] as const);
	}
	return entriesOut;
});
</script>
<template>
	<component v-for="cwp in componentsWithInstanceData" :is="cwp[0]" :instance="cwp[1]" :key="cwp[1].pid" :target="undefined" />
</template>
