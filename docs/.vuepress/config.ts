import { defineUserConfig } from "vuepress"
import { defaultTheme } from 'vuepress'

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "Fang Hsiu's Wiki",
  description: "这是我的第一个 VuePress 站点",
  head: [["link", { rel: "icon", href: "/images/favicon.svg" }]],
  theme: defaultTheme({
    // 默认主题配置
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: "GitHub",
        link: "https://github.com/fanghsiu/fanghsiu.github.io",
      },
    ],
  }),
})

