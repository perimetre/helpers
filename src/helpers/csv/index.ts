import { stringify, parse } from 'csv';
import { Parser } from 'csv-parse';
import { Input, Options } from 'csv-stringify';
import fs from 'fs';
import path from 'path';

export type CsvParserOptions = Parser['options'];

/**
 * Reads a .csv file and parses it
 * @param filePath the path to the .csv file(including filename and extension)
 * @param handler a function that will be called for each chunk of rows
 * @param opts options to provide to the csv-parse package
 * @param itemsPerPage the number of items to process per chunk
 * @param signal an AbortSignal to abort the operation
 */
export const parseCsv = <T>(
  filePath: string,
  handler: (row: T[]) => Promise<void>,
  opts?: CsvParserOptions,
  itemsPerPage = 3000,
  signal?: AbortSignal
) =>
  new Promise<void>((resolve, reject) => {
    // If the signal is already aborted, immediately throw in order to reject the promise.
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }

    let rows: T[] = [];

    const stream = fs.createReadStream(filePath, {
      encoding: 'utf8'
    });
    const parser = parse(opts);

    /**
     * If there's any error when parsing the file
     */
    const onError = (error: unknown) => {
      signal?.removeEventListener('abort', abortListener);
      parser.end();
      reject(error);
    };

    /**
     * If the signal is aborted
     */
    const abortListener = () => {
      // Stop the main operation
      // Reject the promise with the abort reason.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      onError(signal!.reason);
    };

    // Watch for 'abort' signals
    signal?.addEventListener('abort', abortListener);

    // Handle events from the parser
    parser.on('data', (row: T) => {
      // If the signal is already aborted, immediately throw in order to reject the promise.
      if (signal?.aborted) {
        reject(signal.reason);
        return;
      }

      rows.push(row);

      // If we have enough rows, pause the stream and process them
      if (rows.length >= itemsPerPage) {
        parser.pause();
        stream.pause();
        handler(rows) // Process rows
          .then(() => {
            // If the signal is already aborted, immediately throw in order to reject the promise.
            if (signal?.aborted) {
              reject(signal.reason);
              return;
            }
            rows = [];
            parser.resume();
            stream.resume();
          })
          .catch(onError);
      }
    });

    parser.on('end', () => {
      // If the signal is already aborted, immediately throw in order to reject the promise.
      if (signal?.aborted) {
        reject(signal.reason);
        return;
      }

      // Process any remaining rows in the last chunk
      if (rows.length > 0) {
        handler(rows)
          .then(() => {
            // If the signal is already aborted, immediately throw in order to reject the promise.
            if (signal?.aborted) {
              reject(signal.reason);
              return;
            }

            signal?.removeEventListener('abort', abortListener);
            rows = []; // Clearn the rows array (free up memory)
            resolve();
          })
          .catch((error) => {
            onError(error);
          });
      } else {
        signal?.removeEventListener('abort', abortListener);
        rows = []; // Clearn the rows array (free up memory)
        resolve();
      }
    });

    // Handle error event
    parser.on('error', onError);

    // Pipe the file stream to the parser
    stream.pipe(parser);
  });

/**
 * Generates a .csv file
 * @param dir the folder to save the file to
 * @param name the file name (including extension)
 * @param content the content to write to the file
 * @param opts options to provide to the csv-stringify package
 * @param append whether to append to an existing file or not
 */
export const makeCsv = async (dir: string, name: string, content: Input, opts: Options = {}, append = false) =>
  new Promise<void>((resolve, reject) => {
    const writeStream = fs.createWriteStream(path.join(dir, name), { flags: append ? 'a' : 'w', encoding: 'utf8' });

    stringify(content, opts)
      .on('data', (chunk) => {
        writeStream.write(chunk);
      })
      .on('error', reject)
      .on('finish', () => {
        writeStream.end();
      });

    writeStream.on('error', reject).on('finish', resolve);
  });
