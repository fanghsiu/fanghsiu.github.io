# 方脩的随笔

> 唯此薪火 永燃不熄

个人博客，基于 [Valaxy](https://valaxy.site) 与 [valaxy-theme-yun](https://github.com/YunYouJun/valaxy-theme-yun) 构建。

- 在线地址：<https://fanghsiu.cn>
- 作者：方脩

## 功能特性

- 📝 Markdown 写作，支持 Front Matter、行号、代码高亮
- 🔍 Fuse.js 本地全文搜索
- 💬 Waline 评论系统（评论数据独立部署，见 `waline.fanghsiu.cn`）
- 🖼️ 图片灯箱（LightGallery）+ 图片缩放（MediumZoom）
- 🔒 文章加密（encrypt）
- 📡 RSS / Atom / JSON Feed 订阅
- 🗺️ 自动生成 sitemap 与 robots.txt
- 📱 PWA 支持
- 🚀 SSG 静态构建，可部署到 GitHub Pages / Netlify / Vercel / Docker

## 技术栈

- [Valaxy](https://valaxy.site)（Vite + Vue 3 + SSG）
- [valaxy-theme-yun](https://github.com/YunYouJun/valaxy-theme-yun)
- TypeScript
- UnoCSS

## 快速开始

环境要求：Node.js 16+（推荐使用 [pnpm](https://pnpm.io)）。

```bash
# 安装依赖
npm install
# 或使用 pnpm
pnpm install

# 本地开发，默认 http://localhost:3333
npm run dev

# 构建静态站点（输出到 dist/）
npm run build

# 本地预览构建结果
npm run serve
```

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | SSG 构建（等同 `build:ssg`） |
| `npm run build:spa` | SPA 构建 |
| `npm run serve` | 预览构建产物 |
| `npm run new` | 交互式创建新文章 |
| `npm run rss` | 生成 RSS / Feed |
| `npm run fuse` | 生成搜索索引 |
| `npm run clean` | 清理 dist 与生成文件 |

## 写文章

文章放在 `pages/posts/` 下，Markdown 文件即文章页。推荐用命令创建：

```bash
npm run new
```

文章头部（Front Matter）示例：

```markdown
---
layout: post
title: 文章标题
date: 2024-01-01
updated: 2024-01-02
categories: [随笔]
tags: [生活, 记录]
top: false
---

正文内容……
```

其他自定义页面（关于、相册、友链等）位于 `pages/` 目录。

## 目录结构

```text
.
├── components/        # 自定义 Vue 组件（自动注册）
├── layouts/           # 布局组件
├── locales/           # 国际化文案
├── pages/             # 页面与文章（Markdown / Vue）
│   ├── posts/         # 博客文章
│   ├── albums/        # 相册
│   ├── about/         # 关于页面
│   ├── links/         # 友情链接
│   └── girls/         # 红颜列表
├── public/            # 静态资源（图片、favicon、Feed 等）
├── styles/            # 全局样式
├── site.config.ts     # 站点信息（标题、作者、社交链接等）
├── theme.config.ts    # 主题配置（导航、页脚、Banner 等）
└── valaxy.config.ts   # Valaxy 主配置（插件、构建、Markdown 等）
```

## 配置说明

- `site.config.ts`：站点标题、描述、作者、社交链接、搜索与评论开关
- `theme.config.ts`：主题外观、导航菜单、页脚、背景图等
- `valaxy.config.ts`：Valaxy 核心配置，包括 Waline / LightGallery 插件、sitemap、Markdown 选项

## 部署

### GitHub Pages

仓库已内置 GitHub Actions 工作流（`.github/workflows/gh-pages.yaml`）：

1. 在 GitHub 仓库 Settings → Secrets 中添加 `VALAXY_TOKEN`
2. 手动触发 Actions 中的 **GitHub Pages** 工作流
3. 构建产物自动发布到 GitHub Pages 分支

### Netlify / Vercel

仓库已包含 `netlify.toml` 与 `vercel.json` 配置，可直接导入部署：

- 构建命令：`npm run build`
- 发布目录：`dist`

### Docker

```bash
docker build -t fanghsiu-blog .
docker run -d -p 80:80 fanghsiu-blog
```

镜像基于 Node 构建后，由 Nginx 托管静态文件。

## License

[CC BY-NC-SA 4.0](LICENSE)
