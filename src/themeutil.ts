import shade50 from "@/assets/shades/2px-50.png";
export const dotPattern = (rows: number = 1, pixelSize: number = 1) => {
	return {
		borderImageSource: `url(${shade50})`,
		borderImageWidth: `${rows * pixelSize}px`,
		borderImageSlice: rows * pixelSize,
		borderImageRepeat: "repeat",
	}
}
