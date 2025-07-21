import type Empty from "@t/Empty.js";
import type {DefineComponent, SlotsType} from "vue";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ComponentShape<Props = Empty, Slots extends SlotsType = SlotsType<{ default: () => any }>> = DefineComponent<Props, any, any, {}, {}, {}, {}, {}, string, any, any, any , Slots>;
export type {ComponentShape as default};