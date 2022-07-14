/**
 * Strips out from object keys that have `undefined` as value
 *
 * @param obj The object you want to remove undefined keys from
 * @returns a new instance of the object, with undefined values removed
 */
export const stripUndefinedFromObject = <T extends Record<string, unknown>>(obj: T) =>
  JSON.parse(JSON.stringify(obj)) as T;

/**
 * Strips out from object keys that have `null` as value
 *
 * @param obj The object you want to remove null keys from
 * @returns a new instance of the object, with null values removed
 */
export const stripNullFromObject = <T extends Record<string, unknown>>(obj: T): T =>
  Object.fromEntries(
    Object.entries(obj)
      .filter(([, value]) => value !== null)
      .map(
        ([key, value]) =>
          [
            key,
            value === Object(value) && !Array.isArray(value)
              ? stripNullFromObject(value as Record<string, unknown>)
              : value
          ] as [string, unknown]
      )
  ) as T;

/**
 * Strips out from object keys that have `undefined` or `null` as value
 *
 * @param obj The object you want to remove undefined and null keys from
 * @returns a new instance of the object, with undefined and null values removed
 */
export const stripUndefinedAndNullFromObject = <T extends Record<string, unknown>>(obj: T) =>
  stripNullFromObject(stripUndefinedFromObject(obj)) as T;
