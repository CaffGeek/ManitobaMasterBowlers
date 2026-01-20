import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { requirePermission } from "./auth";
const { BlobServiceClient } = require("@azure/storage-blob");

export async function DeleteMedia(request: HttpRequest, _context: InvocationContext): Promise<HttpResponseInit> {
  const auth = await requirePermission(request, "delete:media");
  if (auth) {
    return auth;
  }

  const connectionString = process.env.MediaStorageConnectionString;
  if (!connectionString) {
    return { status: 500, jsonBody: { message: 'MediaStorageConnectionString is not configured.' } };
  }

  const containerName = (process.env.MediaContainerName || 'site-media').trim();
  if (!containerName) {
    return { status: 500, jsonBody: { message: 'MediaContainerName is not configured.' } };
  }

  const rawName = request.params.name;
  const blobName = decodeURIComponent(rawName || '');
  if (!blobName) {
    return { status: 400, jsonBody: { message: 'Blob name is required.' } };
  }

  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlockBlobClient(blobName);

  await blobClient.deleteIfExists();

  return { status: 200, jsonBody: { ok: true, name: blobName } };
}

app.http('DeleteMedia', {
  methods: ['DELETE'],
  authLevel: 'anonymous',
  route: 'media/{name}',
  handler: DeleteMedia,
});
