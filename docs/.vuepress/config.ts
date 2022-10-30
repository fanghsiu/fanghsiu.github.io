import { defineUserConfig } from "vuepress"
import { defaultTheme } from "vuepress"
import { navbar, sidebar } from "./configs"
import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon'

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "Fang Hsiu's Wiki",
  description: "由 VuePress 生成的静态 WiKi 网站",
  head: [["link", { rel: "icon", href: "/images/logo.svg" }]],
  theme: defaultTheme({
    // 默认主题配置
    logo: "/images/logo.svg",
    repo: "fanghsiu/fanghsiu.github.io",
    docsDir: "docs",
    navbar: navbar.zh,
    sidebar: sidebar.zh,
    // page meta
    editLinkText: "编辑此页",
    lastUpdatedText: "上次更新",
    contributorsText: "贡献人员",
    // custom containers
    tip: "提示",
    warning: "注意",
    danger: "警告",
    // 404 page
    notFound: [
      "这里什么都没有",
      "我们怎么到这来了？",
      "这是一个 404 页面",
      "看起来我们进入了错误的链接",
    ],
    backToHome: "返回首页",
    // a11y
    openInNewWindow: "在新窗口打开",
    toggleColorMode: "切换颜色模式",
    toggleSidebar: "切换侧边栏",
  }),
})
