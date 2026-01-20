import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { requirePermission } from "./auth";
import { MEDIA_MAX_UPLOAD_BYTES, MEDIA_MAX_UPLOAD_MB } from "../constants/media";
const { BlobServiceClient } = require("@azure/storage-blob");
const path = require("path");

type UploadMediaBody = {
  fileName?: string;
  contentType?: string;
  dataBase64?: string;
  prefix?: string;
};

const sanitizeName = (name: string) => name.replace(/[^a-zA-Z0-9._-]+/g, '-');

export async function UploadMedia(request: HttpRequest, _context: InvocationContext): Promise<HttpResponseInit> {
  const auth = await requirePermission(request, "edit:content");
  if (auth) {
    return auth;
  }

  let body: UploadMediaBody = {};
  try {
    body = (await request.json()) as UploadMediaBody;
  } catch {
    body = {};
  }

  const connectionString = process.env.MediaStorageConnectionString;
  if (!connectionString) {
    return { status: 500, jsonBody: { message: 'MediaStorageConnectionString is not configured.' } };
  }

  const containerName = (process.env.MediaContainerName || 'site-media').trim();
  if (!containerName) {
    return { status: 500, jsonBody: { message: 'MediaContainerName is not configured.' } };
  }

  const rawName = (body.fileName || 'upload.bin').trim();
  const rawPrefix = (body.prefix || '').trim();
  const contentType = (body.contentType || 'application/octet-stream').trim();
  let data = (body.dataBase64 || '').trim();

  if (!data) {
    return { status: 400, jsonBody: { message: 'dataBase64 is required.' } };
  }

  const dataUrlPrefix = /^data:[^;]+;base64,/i;
  if (dataUrlPrefix.test(data)) {
    data = data.replace(dataUrlPrefix, '');
  }

  let buffer: Buffer;
  try {
    buffer = Buffer.from(data, 'base64');
  } catch {
    return { status: 400, jsonBody: { message: 'dataBase64 must be valid base64.' } };
  }
  if (buffer.length > MEDIA_MAX_UPLOAD_BYTES) {
    return { status: 413, jsonBody: { message: `File too large. Maximum size is ${MEDIA_MAX_UPLOAD_MB}MB.` } };
  }

  const ext = path.extname(rawName);
  const base = sanitizeName(path.basename(rawName, ext)) || 'upload';
  const time = new Date();
  const pad = (value: number) => value.toString().padStart(2, '0');
  const timestamp = `${time.getFullYear()}${pad(time.getMonth() + 1)}${pad(time.getDate())}${pad(time.getHours())}${pad(time.getMinutes())}${pad(time.getSeconds())}`;
  const prefix = rawPrefix ? `${sanitizeName(rawPrefix)}-` : '';
  const blobName = `${timestamp}-${prefix}${base}${ext}`;

  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlockBlobClient(blobName);

  await blobClient.uploadData(buffer, {
    blobHTTPHeaders: { blobContentType: contentType },
  });

  return {
    status: 200,
    jsonBody: {
      url: blobClient.url,
      name: blobName,
      size: buffer.length,
      contentType,
    },
  };
}

app.http('UploadMedia', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'media/upload',
  handler: UploadMedia,
});
