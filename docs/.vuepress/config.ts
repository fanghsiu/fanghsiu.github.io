import { defineUserConfig } from "vuepress"
import { defaultTheme } from "vuepress"
import { navbar, sidebar } from "./configs"

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "Fang Hsiu's Wiki",
  description: "由 VuePress 生成的静态 WiKi 网站",
  head: [["link", { rel: "icon", href: "/images/logo.svg" }]],
  theme: defaultTheme({
    // 默认主题配置
    navbar: navbar.zh,
    sidebar: sidebar.zh,
    logo: "/images/logo.svg",
    repo: "fanghsiu/fanghsiu.github.io",
    editLink: true,
    docsDir: "docs",
  }),
})
