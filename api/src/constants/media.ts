export const MEDIA_MAX_UPLOAD_BYTES = Number(process.env.MediaMaxUploadBytes || 5 * 1024 * 1024);
export const MEDIA_MAX_UPLOAD_MB = Math.ceil(MEDIA_MAX_UPLOAD_BYTES / (1024 * 1024));
