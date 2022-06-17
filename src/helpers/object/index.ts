/**
 * Strips out from object keys that have undefined as value
 *
 * @param obj The object you want to remove undefined keys from
 * @returns a new instance of the object, with undefined values removed
 */
export const stripUndefinedFromObject = <T extends Record<string, unknown>>(obj: T) =>
  JSON.parse(JSON.stringify(obj)) as T;
