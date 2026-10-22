export function publicUploadUrl(storedPath: string | null | undefined): string | null {
  if (!storedPath) return null;
  return storedPath.startsWith("http") ? storedPath : storedPath;
}
