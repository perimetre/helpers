import path from 'path';
import fs from 'fs';

/**
 * From a list of given paths, check if the extension is the same for all of them
 *
 * @param paths the list of path
 * @returns whether or not the extension is the same for all of them
 */
export const isSameExtension = (...paths: string[]) => {
  if (!paths || paths.length <= 0) return false;

  const exts = paths.map(path.extname);
  const first = exts[1];

  return exts.every((ext) => ext === first);
};

/**
 * Replaces an extension in a path/name
 *
 * @param original the original path/name
 * @param replaceWith the path/name of the extension you want to use to replace with
 * @returns a new path/name with the extension replaced
 */
export const replaceExtension = (original: string, replaceWith: string) => {
  //   if (isSameExtesion(original, replaceWith)) return original;

  const newExt = path.extname(replaceWith);
  const originalExt = path.extname(original);

  return originalExt ? original.replace(originalExt, newExt) : original + newExt;
};

/**
 * Creates a file into a directory
 *
 * @param dir the directory to create the file into
 * @param fileName the name of the file
 * @param content the content of the file
 */
export const makeFile = (dir: string, fileName: string, content: unknown) => {
  fs.mkdir(dir, { recursive: true }, (err) => {
    if (err) throw err;

    fs.writeFile(path.join(dir, fileName), JSON.stringify(content, null, 2), { flag: 'w' }, (err) => {
      if (err) throw err;
    });
  });
};
