<script setup lang="ts">
import Themed from "@/components/ThemeProvider/Themed.vue";
</script>
<script lang="ts">
export default {
	name: 'Pane(Wrapper)'
}
</script><template>
	<Themed is="Pane" :class="['pane']"><slot /></Themed>
</template>
