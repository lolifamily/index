import type { APIRoute } from 'astro';
import { base } from 'astro:config/server';
import { getSitemapIndexUrl } from '@/utils/getpath';

export const GET: APIRoute = () => {
  return new Response(`User-agent: *
Allow: ${base}

Sitemap: ${getSitemapIndexUrl()}`, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};
