import { join } from 'node:path/posix';
import { root, base } from 'astro:config/server';

export function getFullPath(path: string) {
  return join(base, path);
}

export function getFullUrl(path: string) {
  return new URL(getFullPath(path), root);
}
