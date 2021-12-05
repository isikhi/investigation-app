import * as fs from 'fs';
import csv from 'csv-parser'

export const csvToJsonConverter = (path: string) => {
  const results = [];
  return new Promise(resolve => {
    fs.createReadStream(path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      });
  });
};
