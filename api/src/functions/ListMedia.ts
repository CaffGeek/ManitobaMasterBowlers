import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { requirePermission } from "./auth";
const { BlobServiceClient } = require("@azure/storage-blob");

export async function ListMedia(request: HttpRequest, _context: InvocationContext): Promise<HttpResponseInit> {
  const auth = await requirePermission(request, "edit:content");
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

  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const items: any[] = [];

  for await (const blob of containerClient.listBlobsFlat()) {
    items.push({
      name: blob.name,
      url: containerClient.getBlockBlobClient(blob.name).url,
      size: blob.properties.contentLength || 0,
      contentType: blob.properties.contentType || '',
      lastModified: blob.properties.lastModified || null,
    });
  }

  return {
    status: 200,
    jsonBody: items,
  };
}

app.http('ListMedia', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'media',
  handler: ListMedia,
});
