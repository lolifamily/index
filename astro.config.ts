import { defineConfig } from 'astro/config';
import solidJs from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

import rehypeSanitize from './src/plugins/rehype-sanitize';
import remarkDirectiveRehype from './src/plugins/remark-directive-rehype';
import remarkRemoveCjkBreaks from './src/plugins/remark-remove-cjk-breaks';
import remarkPangu from './src/plugins/remark-pangu';

import remarkDirective from 'remark-directive';
import remarkEmoji from 'remark-emoji';
import remarkGithubAdmonitionsToDirectives from 'remark-github-admonitions-to-directives';
import { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';

import playformCompress from '@playform/compress';

import { browserslistToTargets } from 'lightningcss';

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
    remarkPlugins: [remarkDefinitionList, remarkGithubAdmonitionsToDirectives,
      remarkDirective, remarkDirectiveRehype, remarkPangu,
      [remarkRemoveCjkBreaks, {
        includeEmoji: true,
      }], [remarkEmoji, {
        accessible: true,
      }]],
    rehypePlugins: [rehypeSanitize],
    remarkRehype: {
      handlers: {
        ...defListHastHandlers,
      },
      footnoteBackContent: '\u2003', // Em Space
      footnoteBackLabel: (idx, reIdx) => `返回引用 ${idx + 1}${reIdx > 1 ? `-${reIdx}` : ''}`,
      footnoteLabel: '脚注',
    },
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
    rustCompiler: false,
    queuedRendering: {
      enabled: true,
      contentCache: true,
    },
  },
});
