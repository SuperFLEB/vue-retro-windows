<script setup lang="ts">
import ThemedComponent from "@/ThemedComponent/ThemedComponent.vue";
</script>
<script lang="ts">
export default {
	name: 'WindowPane(Wrapper)'
}
</script><template>
	<ThemedComponent is="RwWindowPane" :class="['pane']"><slot /></ThemedComponent>
</template>
