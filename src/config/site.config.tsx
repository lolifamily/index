/**
 * Identity 配置文件
 * 集中管理所有个人信息和站点配置
 */

import GithubLogoIcon from '@phosphor-icons/core/assets/duotone/github-logo-duotone.svg';
import EnvelopeIcon from '@phosphor-icons/core/assets/duotone/envelope-duotone.svg';
import GlobeIcon from '@phosphor-icons/core/assets/duotone/globe-duotone.svg';
import LinuxLogoIcon from '@phosphor-icons/core/assets/duotone/linux-logo-duotone.svg';
import SteamLogoIcon from '@phosphor-icons/core/assets/duotone/steam-logo-duotone.svg';
import SubwayIcon from '@phosphor-icons/core/assets/duotone/subway-duotone.svg';

import avatarImage from '@/assets/avatar.jpg';
import faviconUrl from '@/assets/favicon-32x32.png?url&no-inline';
import faviconUrl192 from '@/assets/favicon-192x192.png?url&no-inline';
import faviconUrl180 from '@/assets/favicon-180x180.png?url&no-inline';
import backgroundImage from '@/assets/background.jpg';
import ogImage from '@/assets/og-cover.jpg?url&no-inline';

export default {
  // 基本信息
  profile: {
    name: 'lolifamily',                         // 显示名称
    title: 'Chief Curiosity Officer',
    avatar: {
      src: avatarImage,
      alt: 'lolifamily\'s avatar',
      width: 240,
      height: 240,
    },
  },

  // SEO元数据
  meta: {
    title: 'lolifamily\'s page',
    description: 'lolifamily的个人主页，也许能找到你喜欢的东西吧',
  },

  // 社交链接
  links: [
    {
      icon: GithubLogoIcon,
      url: 'https://github.com/lolifamily',
      title: 'GitHub',
    },
    {
      icon: EnvelopeIcon,
      url: 'mailto:lolifamilies@gmail.com',
      title: 'Email',
    },
    {
      icon: LinuxLogoIcon,
      url: 'https://linux.do/u/charliez0/summary',
      title: 'LinuxDo',
    },
    {
      icon: SteamLogoIcon,
      url: 'https://steamcommunity.com/id/charliez0sp',
      title: 'Steam',
    },
    {
      icon: SubwayIcon,
      url: 'https://www.travellings.cn/go.html',
      title: 'Travelling',
    },
  ],

  // 项目展示列表（每项的 links 直接配置图标 + URL，组件内不做条件分支）
  projects: [
    {
      name: 'refined',
      description: 'Refined Astro blog theme',
      links: [
        {
          icon: GithubLogoIcon,
          url: 'https://github.com/loliblogs/Refined',
          title: 'GitHub',
        },
        {
          icon: GlobeIcon,
          url: 'https://blog.lolifamily.js.org',
          title: 'Live',
        },
      ],
    },
    {
      name: 'static',
      description: 'Static File Browser by Astro',
      links: [
        {
          icon: GithubLogoIcon,
          url: 'https://github.com/lolifamily/static',
          title: 'GitHub',
        },
        {
          icon: GlobeIcon,
          url: 'https://static.lolifamily.js.org',
          title: 'Live',
        },
      ],
    },
  ],

  // 网站图标
  favicon: () => (                     // 图标 (Vite 处理后的 URL)
    <>
      <link rel="icon" href={faviconUrl} sizes="32x32" />
      <link rel="icon" href={faviconUrl192} sizes="192x192" />
      <link rel="apple-touch-icon" href={faviconUrl180} sizes="180x180" />
    </>
  ),
  ogImage,

  header: () => (
    <>
      <meta name="google-site-verification" content="7_jEvDR3ggk6tLdJKrr-rNzJchC81DGeO2ZzSXPixcg" />
      <meta name="google-site-verification" content="svGvv3mqZ3LG3oc6wLWauuJ_br6i1hkIUP_Zl3G3xGU" />
      <meta name="google-site-verification" content="F887_8q9nOn1uZ9dJj3ws-Alw27KnunixJO_3m__Z-Q" />
      <meta name="google-site-verification" content="29mDgzP9v9aE6S-Rug2DeShzpcR-Jv21wR2fgzRu2MU" />
      <meta name="google-site-verification" content="o9tV4facW2oZw6oLUBQtEtiDDiUmA6r84Dn8hO9yxjs" />
      <meta name="google-site-verification" content="Pee7tcDayUCumv1uBEndhQpK89bf6VLIddKptqd3DpA" />
    </>
  ),

  footer: () => (
    <li>
      <a
        href="https://icp.gov.moe/?keyword=20236898"
        target="_blank"
        class="
          transition-colors
          hover:text-hover
          forced-colors:hover:text-[Highlight]
        "
      >
        <span class="underline">萌ICP备20236898号</span>
      </a>
    </li>
  ),

  // 背景图（颜色/渐变已在 global.css CSS 变量中定义）
  backgroundImage,
};
