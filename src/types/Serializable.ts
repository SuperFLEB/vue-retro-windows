import type {LimitRecursion} from "@t/LimitRecursion.ts";
export type Keyable = string | number;
type Shallow = string | number | null | boolean;
export type Serializable = LimitRecursion<Shallow, Keyable>;
