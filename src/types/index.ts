/**
 * A helper type that will remove the `Promise<Type>` from a type and only return the innter `Type`
 */
export type UnpackPromise<T> = T extends Promise<infer U> ? U : T;

/**
 * A helper type that will append a type(`AppendType`) only to the keys that contain another type(`KeyOfType`)
 */
export type AppendTypeToKeyOfType<TModel, AppendType, KeyOfType> = {
  // Ref: https://stackoverflow.com/questions/66747860/is-it-possible-to-have-an-augment-conditional-type-that-adds-undefined-only-t/66748010#66748010
  [key in keyof TModel]: KeyOfType extends TModel[key] ? TModel[key] | AppendType : TModel[key];
};

/**
 * A helper type that will append `undefined` only to keys that are `null`
 */
export type AppendUndefinedWhereItsNull<TModel> = AppendTypeToKeyOfType<TModel, undefined, null>;

/**
 * A helper type that picks the provided properties, and make all other properties optional
 */
export type PickOtherwisePartial<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;
