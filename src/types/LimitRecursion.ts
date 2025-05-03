type Recursions = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
type MaxDepth = keyof Recursions & number;
type Decrement<D extends MaxDepth> = Recursions[D];
export type LimitRecursion<T, TKey extends string | number | symbol = string | number | symbol, Depth extends MaxDepth = 7, TFallback = any> =
	Depth extends 0 ?
		TFallback :
		(
			T |
			LimitRecursion<T, TKey, Decrement<Depth>, TFallback>[] |
			{ [k in TKey]: LimitRecursion<T, TKey, Decrement<Depth>, TFallback> }
			);
