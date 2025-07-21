<script setup lang="ts">
import useTheme from "@/providers/ThemeProvider/useTheme.ts";
import {computed} from "vue";
import type {ThemeEffects, ThemeEffectsList} from "@t/Theme.ts";
import type {SingleOrArray} from "@t/SingleOrArray.ts";

type Props = { not?: boolean, name?: string, isRootTheme?: true, effects?: SingleOrArray<keyof ThemeEffects>, match?: boolean };
const props = withDefaults(defineProps<Props>(), { not: false, name: undefined, effects: undefined, isRootTheme: undefined, match: false });
const {interface: intf, isRootTheme: themeIsRootTheme, themeRef} = useTheme();

const result = computed(() => {
	if ([props.name, props.effects, props.isRootTheme].filter(v => v !== undefined).length > 1) throw new TypeError("Multiple mutually-exclusive props provided. You can only do one type of match.");
	if (props.name) {
		if (props.match && themeRef.value.keyName.includes(props.name)) return (!props.not);
		if (props.name === themeRef.value.keyName) return (!props.not);
	}
	if (props.effects) {
		const effects: ThemeEffectsList = Array.isArray(props.effects) ? props.effects : [props.effects];
		const themeEffects = intf.getCurrentThemeEffects();
		for (const eff of effects) {
			if (themeEffects.includes(eff) === props.not) return false;
		}
		return true;
	}
	if (props.isRootTheme) return themeIsRootTheme !== props.not;

	console.warn(`<IfTheme> without operands ${props.not ? 'and "not" property ' : ''}will always return ${props.not ? "false" : "true"}.`);
	return !props.not;
});
</script>

<template>
<slot v-if="result" />
</template>
