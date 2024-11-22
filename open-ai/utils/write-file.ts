import fs from 'fs';

import { AcceptableBuffer } from '../types/index.js';

export type WriteBufferFileProps = {
  path: string;
  fileName: string;
  buffer: AcceptableBuffer;
};

export const writeBufferFile = async ({
  path,
  fileName,
  buffer,
}: WriteBufferFileProps) =>
  fs.promises.writeFile(`${path}/${fileName}`, buffer);
