import type {DeepReadonly, Ref, ShallowRef} from "vue";
export type AnyRef<T> = Ref<T> | ShallowRef<T> | DeepReadonly<Ref<T>>;
