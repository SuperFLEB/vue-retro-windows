<script setup lang="ts">

import {RwWindow} from "@exp/components.ts";
import RegistrationFormForm from "./RegistrationFormForm.vue";
</script>

<template>
	<RwWindow :x="50" :y="50" :width="600" :height="800" title="Registration" winId="main">
		<RegistrationFormForm />
	</RwWindow>

</template>

<style scoped>

</style>