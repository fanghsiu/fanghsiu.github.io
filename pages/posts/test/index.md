---
layout: post
title: 功能测试
date: 2023-06-01
updated: 2023-06-01
categories: [Valaxy]
tags: [测试]
codeHeightLimit: 300
---

<!-- @include:./included.md{5,} -->

## Time Warning
time_warning 默认为 180 天。

---

$$\color{#EE1C25}y = ax^2 + bx + c$$

![爷和流萤](https://upload-bbs.miyoushe.com/upload/2024/03/08/288909600/0ee25815227885828cc8c6d908d4e807_902317807682662192.png?x-oss-process=image/resize,w_1048/format,avif "爷和流萤")

<pic src="https://i0.hdslb.com/bfs/album/1cf0720220f2e393d8a3d7fc61f0c3ce93d8e5fc.jpg@1048w_!web-dynamic.avif" alt="泳装天依" caption="泳装天依"/>

---

## 部分内容加密

```md
<!-- valaxy-encrypt-start:sssss -->
### Page Frontmatter
<pre>{{ frontmatter }}</pre>
<!-- valaxy-encrypt-end -->
```

<!-- valaxy-encrypt-start:sssss -->
### Page Frontmatter
<pre>{{ frontmatter }}</pre>
<!-- valaxy-encrypt-end -->

---

## CODE
```ts:line-numbers
import type { ThemeConfig } from 'valaxy-theme-yun'
import { defineValaxyConfig } from 'valaxy'

const safelist = [
  'i-ri-home-line',
]

export default defineValaxyConfig<ThemeConfig>({
  // site config see site.config.ts or write in siteConfig
  // siteConfig: {},

  theme: 'yun',
  themeConfig: {

    banner: {
      enable: true,
      title: '云游君的小站',
    },

    notice: {
      enable: true,
      content: '公告测试',
    },
  },

  unocss: {
    safelist,
  },
})
```

## 代码组
::: code-group

```sh [npm]
npm install vitepress-plugin-group-icons
```

```sh [yarn]
yarn add vitepress-plugin-group-icons
```

```sh [pnpm]
pnpm add vitepress-plugin-group-icons
```

```sh [bun]
bun add vitepress-plugin-group-icons
```

:::