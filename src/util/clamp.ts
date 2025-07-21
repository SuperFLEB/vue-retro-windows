const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(value, min));
export default clamp;