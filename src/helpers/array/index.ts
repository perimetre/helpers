/**
 * Inserts an element into an array at a given index.
 *
 * @param array the array to insert into
 * @param index the index to insert at
 * @param item the item to insert
 * @returns a new copy of the array with the item inserted
 */
export const insertIntoArray = <T extends Array<Y>, Y>(array: T, index: number, item: Y): T =>
  [
    ...array.slice(0, index),
    item,
    ...array.slice(index) // This one is inclusive
  ] as T;

/**
 * Replaces an item in an array at an specific index
 *
 * @param array the array to replace in
 * @param index the index to replace at
 * @param item the item to replace with
 * @returns a new copy of the array with the item replaced
 */
export const replaceIntoArray = <T extends Array<Y>, Y>(array: T, index: number, item: Y): T =>
  [
    ...array.slice(0, index),
    item,
    ...array.slice(index + 1) // This one skips the item, thus removing it
  ] as T;

/**
 * Finds the next index of an array
 *
 * @param array the array to search in
 * @param predicate the predicate to use to find the next index
 * @returns the next index or the first if there is no next index
 */
export const findNextIndex = <T extends Array<Y>, Y>(
  array: T,
  predicate: (value: Y, index: number, obj: Y[]) => boolean
): number => {
  const currentIndex = array.findIndex(predicate);
  let nextIndex = currentIndex + 1;
  nextIndex = nextIndex >= array.length ? 0 : nextIndex;

  return nextIndex;
};

/**
 * Finds the previous index of an array
 *
 * @param array the array to search in
 * @param predicate the predicate to use to find the previous index
 * @returns the previous index or the first if there is no previous index
 */
export const findPreviousIndex = <T extends Array<Y>, Y>(
  array: T,
  predicate: (value: Y, index: number, obj: Y[]) => boolean
): number => {
  const currentIndex = array.findIndex(predicate);
  let previousIndex = currentIndex - 1;
  previousIndex = previousIndex < 0 ? array.length - 1 : previousIndex;

  return previousIndex;
};

/**
 * Finds the next element from an array
 *
 * @param array the array to search in
 * @param predicate the predicate to use to find the next element
 * @returns the next element or the first if there is no next element
 */
export const findNextInArray = <T extends Array<Y>, Y>(
  array: T,
  predicate: (value: Y, index: number, obj: Y[]) => boolean
): Y => array[findNextIndex(array, predicate)];

/**
 * Finds the previous element of an array
 *
 * @param array the array to search in
 * @param predicate the predicate to use to find the previous element
 * @returns the previous element or the first if there is no previous element
 */
export const findPreviousInArray = <T extends Array<Y>, Y>(
  array: T,
  predicate: (value: Y, index: number, obj: Y[]) => boolean
): Y => array[findPreviousIndex(array, predicate)];

/**
 * Takes an array and limits it to a specific length.
 * It removes the elements at the end
 *
 * @example
 * const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * const limitedArray = limitEnd(array, 5);
 * // limitedArray = [1, 2, 3, 4, 5]
 *
 * @param array the array to limit
 * @param max the maximum length of the array
 * @returns a new copy of the array with the length limited
 */
export const limitEnd = <T extends Array<unknown>>(array: T, max: number): T => array.slice(0, max) as T;

/**
 * Takes an array and limits it to a specific length.
 * It removes the elements at the start
 *
 * @example
 * const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * const limitedArray = limitStart(array, 5);
 * // limitedArray = [6, 7, 8, 9, 10]
 *
 * @param array the array to limit
 * @param max the maximum length of the array
 * @returns a new copy of the array with the length limited
 */
export const limitStart = <T extends Array<unknown>>(array: T, max: number): T => {
  // The slice method takes the absolute value, so if the max is greater than the index
  // It would start considering -2 as 2, -3 as 3. So instead of doing that.
  // Let's return the empty array if the max is greater than the length, as if there are no more elements to limit
  if (max > array.length) {
    return [] as unknown as T;
  }

  return array.slice(array.length - max) as T;
};
