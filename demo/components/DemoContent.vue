<script setup lang="ts">
import {toRefs} from "vue";
type Props = { blather: "lorem" | "history" };
const props = defineProps<Props>();
const {blather} = toRefs(props);
</script>

<template>
	<template v-if="blather === 'lorem'">
		<p>
			Modern computer text generation allows for the creation of
			<a href="https://lipsum.com" target="_blank">
				"Lorem Ipsum"
			</a>
			filler text, which is used in design layouts. This provides more options than using a single, static block
			of text. It is a useful tool for those who need placeholder content in their work.
		</p>
		<p>
			One of the main features of this type of text generation is that it allows for customization. Users can
			control aspects such as the number of words, the structure of sentences, and the overall tone of the text.
			This can be useful in making the placeholder text somewhat relevant to the intended design.
		</p>
		<p>
			Another advantage is that text generation tools can produce filler content in multiple languages. This can
			assist in testing layouts for projects that require localization. By using different languages, designers
			can check whether the text fits properly in the available space.
		</p>
		<p style="white-space: nowrap">
		This is a truly lengthy paragraph, one that stretches on and on without pause, without hesitation, without
		even the slightest inclination toward brevity, for the sole purpose of illustrating just how long a
		paragraph can become when one is determined to extend it far beyond what might be considered reasonable,
		appropriate, or even necessary, as the words continue to flow, unbroken by paragraph breaks or any form of
		truncation, weaving an elaborate tapestry of verbosity that serves no other function than to emphasize its
		own considerable length, its refusal to be anything less than an ongoing cascade of syllables, phrases, and
		clauses, linked endlessly in an unrelenting stream of text that, due to the styling of this particular
		paragraph, will not succumb to the conventional constraints of line wrapping, thereby ensuring that it
		remains a singular, uninterrupted entity, forcing the reader, should they dare to engage with it, to scroll
		endlessly in pursuit of its ultimate conclusion, which, even now, remains elusive, as the paragraph presses
		ever onward in its relentless pursuit of maximum extension, a feat of sheer persistence in the art of
		long-winded exposition that could, conceivably, continue indefinitely were it not for the need, at some
		point, to draw this exercise to a close, which, despite all efforts to prolong the inevitable, must
		eventually come, marking the end of this vast, sprawling, and thoroughly unbroken expression of textual
		excess.
		</p>
		<p>
			In addition to basic paragraphs, these tools can generate other types of structured content. Examples
			include mock blog posts, product descriptions, and other common text formats. This can help with testing how
			different kinds of content will look in a layout.
		</p>
		<p>
			Using generated text in this way can make the design process more efficient. It allows for layouts to be
			tested before the final content is written. This can help avoid problems that might arise later in the
			development process.
		</p>
		<p>
			Overall, computer-generated text is a practical solution for placeholder content needs. It provides a way to
			insert temporary text into designs, making it easier to visualize layouts. This can be helpful for designers
			and developers working on various types of projects.
		</p>
	</template>
	<template v-if="blather === 'history'">
		<p>
		The history of the computer graphical user interface (GUI) began in the 1960s with early research at Xerox
		PARC. Engineers and researchers sought ways to improve human-computer interaction beyond text-based
		command-line interfaces. They experimented with graphical elements like windows, icons, and menus to create
		a more intuitive experience for users. These early concepts laid the foundation for the modern GUI.
		</p>

		<p>
		In the 1970s, Xerox developed the Alto computer, one of the first machines to feature a GUI. The Alto was
		not commercially available, but it demonstrated the potential of graphical interfaces. It included a
		mouse-driven interface with overlapping windows, which would later influence mainstream computing. Despite
		its innovation, the Alto remained mostly within research circles.
		</p>

		<p>
		The 1980s saw the commercial introduction of GUIs with the launch of the Apple Lisa in 1983. The Lisa was
		expensive and did not achieve widespread success, but it introduced a GUI that closely resembled what users
		recognize today. Apple refined the concept with the Macintosh in 1984, which brought the GUI to a broader
		audience. The Macintosh popularized elements like the desktop metaphor and drag-and-drop interaction.
		</p>

		<p>
		Meanwhile, Microsoft developed Windows as a graphical layer for MS-DOS. Windows 1.0 was released in 1985,
		but it was not until Windows 3.0 in 1990 that Microsoft’s GUI became widely adopted. Windows' success was
		driven by its compatibility with existing software and hardware, making it a dominant force in the industry.
		The introduction of Windows 95 in 1995 further cemented Microsoft’s position in the GUI market.
		</p>

		<p>
		Throughout the 2000s and 2010s, GUIs evolved with advancements in hardware and design. Operating systems
		like macOS, Windows, and Linux distributions introduced improved graphical effects, touch-based
		interactions, and streamlined interfaces. Mobile operating systems, such as iOS and Android, brought GUI
		principles to smartphones and tablets, further expanding the reach of graphical interfaces.
		</p>

		<p>
		Today, GUIs continue to evolve with trends like dark mode, minimalist design, and adaptive interfaces.
		Modern computing emphasizes user experience, with GUIs tailored for different devices and accessibility
		needs. As technology advances, new forms of graphical interfaces, such as augmented reality (AR) and virtual
		reality (VR), are shaping the future of human-computer interaction.
		</p>
	</template>
</template>
