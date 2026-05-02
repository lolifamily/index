import { join } from 'node:path/posix';
import { site, base } from 'astro:config/server';

export function getFullPath(path: string) {
  return join(base, path);
}

export function getFullUrl(path: string) {
  return new URL(getFullPath(path), site);
}

export function getSitemapIndexUrl() {
  return new URL(getFullUrl('/sitemap-index.xml'));
}
