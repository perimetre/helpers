/**
 * A predicated that returns whether or not a value is undefined
 *
 * @param value the value that is going to be checked
 * @returns whether or not the value is undefined
 */
export const valueNotUndefined = <TValue>(value: TValue | null | undefined): value is TValue => !!value;
