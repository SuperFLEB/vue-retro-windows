type FontType = "woff2" | "woff" | "otf" | "ttf" | "eot" | "local";
type FontSources = {
	[k in FontType]?: string | string[];
}
type FontUrlArrays = {
	[k in FontType]?: string[];
}

class DocFont {
	#sources: FontUrlArrays = {};
	#promise: Promise<FontFace> | undefined = undefined;
	#familyName: string;
	#descriptors: FontFaceDescriptors = {};

	constructor(familyName: string, sources: FontSources, descriptors: FontFaceDescriptors = {
		weight: "normal",
		style: "normal"
	}) {
		this.#familyName = familyName;
		this.#descriptors = descriptors;
		for (const type of Object.keys(sources) as FontType[]) {
			this.#sources[type] = typeof sources[type] === "string" ? [sources[type]] : sources[type];
		}
	}

	#getExisting(): void {
		if (this.#promise) return;
		eachFont: for (const font of document.fonts) {
			const compareTo = {family: this.#familyName, ...this.#descriptors} as Partial<FontFace>;
			const compare = ["family", "weight", "style"] as (keyof FontFace)[];
			for (const property of compare) {
				if (compareTo[property] !== font[property]) continue eachFont;
			}
			this.#promise = font.loaded;
			return;
		}
	}

	#source() {
		return Object.entries(this.#sources).map(([type, urls]) => {
			if (type === "local") return urls.map(url => `local('${url}')`).join(",");
			return urls.map(url => `url('${url}') type('${type}')`).join(",");
		}).join(",");
	}

	load() {
		this.#getExisting();
		if (this.#promise) return this.#promise;

		const fontFace = new FontFace(this.#familyName, this.#source(), this.#descriptors);
		this.#promise = fontFace.load();
		return this.#promise;
	}
}

export default DocFont;
