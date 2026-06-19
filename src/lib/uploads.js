import { randomBytes } from 'node:crypto';
import { mkdir, writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';

// Where uploaded files live on disk. Served statically from /uploads/<file>.
export const UPLOAD_DIR = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.join(process.cwd(), 'public', 'uploads');

export const ALLOWED_TYPES = ['image/webp', 'image/jpeg', 'image/png', 'image/avif'];
export const MAX_BYTES = 12 * 1024 * 1024; // 12 MB

const EXT_BY_TYPE = {
  'image/webp': 'webp',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/avif': 'avif',
};

// Best-effort intrinsic-size sniffing without an image library.
const readDimensions = (buf, type) => {
  try {
    if (type === 'image/png') {
      return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    }
    if (type === 'image/jpeg') {
      let offset = 2;
      while (offset < buf.length) {
        if (buf[offset] !== 0xff) { offset += 1; continue; }
        const marker = buf[offset + 1];
        if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
          return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
        }
        offset += 2 + buf.readUInt16BE(offset + 2);
      }
    }
    if (type === 'image/webp') {
      // VP8X / VP8L / VP8 chunks.
      const fourcc = buf.toString('ascii', 12, 16);
      if (fourcc === 'VP8X') {
        const w = 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16));
        const h = 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16));
        return { width: w, height: h };
      }
      if (fourcc === 'VP8L') {
        const b = buf.subarray(21);
        const w = 1 + (((b[1] & 0x3f) << 8) | b[0]);
        const h = 1 + (((b[3] & 0x0f) << 10) | (b[2] << 2) | ((b[1] & 0xc0) >> 6));
        return { width: w, height: h };
      }
      if (fourcc === 'VP8 ') {
        return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
      }
    }
  } catch {
    // fall through
  }
  return { width: 0, height: 0 };
};

// Save a File/Blob to the upload dir; returns { filename, width, height }.
export const saveUpload = async (file) => {
  if (!file || typeof file.arrayBuffer !== 'function') {
    throw new Error('No file provided.');
  }
  const type = file.type;
  if (!ALLOWED_TYPES.includes(type)) {
    throw new Error('Unsupported file type. Use WebP, JPEG, PNG or AVIF.');
  }
  if (file.size > MAX_BYTES) {
    throw new Error('File too large (max 12 MB).');
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const { width, height } = readDimensions(buf, type);
  const filename = `${Date.now()}-${randomBytes(6).toString('hex')}.${EXT_BY_TYPE[type]}`;

  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, filename), buf);

  return { filename, width, height };
};

// Remove an uploaded file by its stored filename (best effort).
export const deleteUpload = async (filename) => {
  if (!filename) return;
  const safe = path.basename(filename);
  try {
    await unlink(path.join(UPLOAD_DIR, safe));
  } catch {
    // already gone — ignore
  }
};
