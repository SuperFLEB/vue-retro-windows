export type Dimension = "x" | "y";
export type Dimensional<T> = Record<Dimension, T>;
export type Scroll<T> = Dimensional<Record<ScrollDirection, T>>;
export type ScrollDirection = "fwd" | "back";
export type Directional<T> = Record<ScrollDirection, T>;
export type DimensionalDirectional<T> = Record<Dimension, Directional<T>>;
