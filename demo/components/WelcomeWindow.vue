<script setup lang="ts">
import Window from "@/exported/Window.vue";
import IfTheme from "@/exported/IfTheme.vue";
import type {MenuItemSpec} from "@/components/Menu/types.ts";
import VisualElementMangler from "@/components/VisualElementMangler.vue";

const links = {
	"BlenderArtists Portfolio (3D work)": "https://blenderartists.org/u/FLEB/activity/portfolio",
	"Blender 3D addons": "https://gist.github.com/SuperFLEB/d451eb026d2bdd067c2ec44f4de45102",
	"GitHub": "https://github.com/SuperFLEB",
	"LinkedIn": "https://linkedin.com/in/RudyFleminger",
};

function link(url: string) {
	window.open(url, "_blank");
}

const welcomeMenu: MenuItemSpec = {
	name: "(root)",
	sub: [
		{
			name: "Links",
			sub: Object.entries(links).map(([name, url]) => ({name, action: () => link(url)} as MenuItemSpec))
		},
	]
};

</script>

<template>
	<Window title="Welcome" winId="856dd687-12d8-4bc0-a5f1-bd75cda3181b" :x="50" :y="50" :width="600" :height="550"
			:menu="welcomeMenu">
		<IfTheme effects="textOnly">
			<p style="color: #008">[ Image: Welcome to VoteRudy.org! ]</p>
		</IfTheme>
		<IfTheme not effects="textOnly">
			<div style="text-align: center"><img src="@/assets/splash.png" alt="Welcome to VoteRudy.org!"/></div>
		</IfTheme>
		<div style="margin: 1lh 2ch;">
			<p>Welcome to VoteRudy.org. This is a domain I use for email and not much else, so there's not really
				anything here at the moment.</p>
			<p>I decided to throw this "Retro Desktop Environment" app I've been working on as a placeholder page so
				there's
				something more than nothing on it. It's still very much a work in progress, so don't be surprised if
				some parts or pieces don't work.</p>
		</div>
	</Window>
</template>
