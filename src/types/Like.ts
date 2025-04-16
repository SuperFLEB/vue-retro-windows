export type Like<T> = {
	-readonly [k in keyof T]: T[k]
}