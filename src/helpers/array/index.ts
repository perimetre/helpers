/**
 * Inserts an element into an array at a given index.
 *
 * @param array the array to insert into
 * @param index the index to insert at
 * @param item the item to insert
 * @returns a new copy of the array with the item inserted
 */
export const insertIntoArray = <T extends Array<Y>, Y extends unknown>(array: T, index: number, item: Y) => [
  ...array.slice(0, index),
  item,
  ...array.slice(index) // This one is inclusive
];

/**
 * Replaces an item in an array at an specific index
 *
 * @param array the array to replace in
 * @param index the index to replace at
 * @param item the item to replace with
 * @returns a new copy of the array with the item replaced
 */
export const replaceIntoArray = <T extends Array<Y>, Y extends unknown>(array: T, index: number, item: Y) => [
  ...array.slice(0, index),
  item,
  ...array.slice(index + 1) // This one skips the item, thus removing it
];

/**
 * Finds the next element from an array
 *
 * @param array the array to search in
 * @param predicate the predicate to use to find the next element
 * @returns the next element or the first if there is no next element
 */
export const findNextInArray = <T extends Array<Y>, Y extends unknown>(
  array: T,
  predicate: (value: Y, index: number, obj: Y[]) => boolean
): Y => {
  const currentIndex = array.findIndex(predicate);
  let nextIndex = currentIndex + 1;
  nextIndex = nextIndex >= array.length ? 0 : nextIndex;

  return array[nextIndex];
};
