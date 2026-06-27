import { defineConfig } from 'astro/config';
import solidJs from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

import rehypeSanitize from './src/plugins/rehype-sanitize-satteri';
import remarkDirective from './src/plugins/remark-directive-satteri';
import remarkRemoveCjkBreaks from './src/plugins/remark-remove-cjk-breaks-satteri';
import remarkPangu from './src/plugins/remark-pangu-satteri';

import playformCompress from '@playform/compress';

import { browserslistToTargets } from 'lightningcss';

import { satteri } from '@astrojs/markdown-satteri';

// https://astro.build/config
export default defineConfig({
  site: 'https://lolifamily.js.org',
  base: '/', // 可以改为 '/identity/' 等非根路径
  trailingSlash: 'never',
  output: 'static',
  cacheDir: '.cache',
  integrations: [solidJs(), mdx(), playformCompress({
    CSS: false,
    HTML: {
      'html-minifier-terser': {
        minifyCSS: { targets: browserslistToTargets(['chrome 99', 'edge 99', 'firefox 97', 'safari 15']) },
        minifySVG: true,
      },
    },
    JSON: true,
    Image: false,
    JavaScript: false,
    SVG: false,
  }), sitemap({
    filter: page => !page.endsWith('/404') && !page.endsWith('/403'),
    lastmod: new Date(),
  })],
  vite: {
    build: {
      reportCompressedSize: !process.env.CI, // CI 不需要 gzip 大小估算
      minify: 'terser',
      cssMinify: 'lightningcss',
      target: ['chrome99', 'edge99', 'firefox97', 'safari15'],
      sourcemap: true, // 开源项目，随便看！
      rollupOptions: {
        output: {
          manualChunks: id => id.includes('node_modules/solid-js') ? 'runtime' : undefined,
        },
      },
    },
    css: {
      transformer: 'lightningcss',
    },
    plugins: [
      tailwindcss({ optimize: false }),
    ],
  },
  build: {
    // file模式可以保证不会因为目录自动跳转到带/的页面
    format: 'file',
  },
  markdown: {
    processor: satteri({
      features: {
        math: true,
        frontmatter: true,
        directive: true,
        gfm: {
          footnotes: {
            label: '脚注',
            backContent: '\u2003', // Em Space
            // satteri 的 referenceNumber 已是 1-based（remark-rehype 的 idx 是 0-based 需 +1）
            backLabel: (referenceNumber: number, rerunIndex: number) =>
              `返回引用 ${referenceNumber}${rerunIndex > 1 ? `-${rerunIndex}` : ''}`,
          },
        },
      },
      mdastPlugins: [
        remarkDirective,
        remarkPangu,
        remarkRemoveCjkBreaks({ includeEmoji: true }),
      ],
      hastPlugins: [rehypeSanitize],
    }),
  },
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },
  server: ({ command }) => ({
    port: command === 'preview' ? 4321 : 3000,
  }),
  devToolbar: {
    enabled: false,
  },
  experimental: {
    clientPrerender: true,
    contentIntellisense: true,
  },
});
