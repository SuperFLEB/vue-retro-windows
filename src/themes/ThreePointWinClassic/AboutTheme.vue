<script setup lang="ts">
import type {ThemeSpec} from "@t/Theme.ts";

type Props = { themeName: string };
const props = withDefaults(defineProps<Props>(), {});
</script>
<template>
	<p>Three Point Win (Classic Fonts) theme by FLEB (a.k.a. SuperFLEB)</p>
	<p>Uses the SystemTrue font by Blake Burgess</p>
	<section class="license">
		<p>License for SystemTrue font (MIT License)</p>
		<p>Copyright (c) 2018 Blake Burgess</p>

		<p>Permission is hereby granted, free of charge, to any person obtaining a copy
			of this software and associated documentation files (the "Software"), to deal
			in the Software without restriction, including without limitation the rights
			to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
			copies of the Software, and to permit persons to whom the Software is
			furnished to do so, subject to the following conditions:</p>

		<p>The above copyright notice and this permission notice shall be included in all
			copies or substantial portions of the Software.</p>

		<p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
			IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
			FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
			AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
			LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
			OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
			SOFTWARE.</p>
	</section>

	<p>Uses the SystemicDisassembly font by FLEB (a.k.a. SuperFLEB)</p>
	<section class="license">
		<p>License for SystemicDisassembly font</p>

		<p>I'm not exactly sure how I'm going to license this.</p>

		<p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
			IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
			FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
			AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
			LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
			OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
			SOFTWARE.</p>
	</section>
</template>
