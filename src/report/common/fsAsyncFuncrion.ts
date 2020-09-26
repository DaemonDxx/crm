import * as fs from 'fs';

function asyncReadFile(path: string) {
  return new Promise<Buffer>((resolve, reject) => {
    fs.readFile(path, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer);
      }
    })
  });
}

function asyncSaveFile(path, buffer: Uint8Array) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, buffer, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  });
}

export {asyncReadFile, asyncSaveFile}