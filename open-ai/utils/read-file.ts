import fs from 'fs';

export const readFile = (path: fs.PathLike, options?: BufferEncoding) =>
  fs.createReadStream(path, options);
