<script setup lang="ts">
import Themed from "@/themed/Themed.vue";
</script>
<script lang="ts">
export default {
	name: 'WindowPane(Wrapper)'
}
</script><template>
	<Themed is="RwWindowPane" :class="['pane']"><slot /></Themed>
</template>
