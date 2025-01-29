import { defineSiteConfig } from "valaxy"

export default defineSiteConfig({

  url: "https://fanghsiu.top",

  lang: "zh-CN",

  title: "方脩的随笔",

  subtitle: "Chase",

  favicon: "/favicon.ico",

  author: {
    name: "方脩",
    email: "fanghsiu@foxmail.com",
    link: "https://fanghsiu.top",
    avatar: "/images/avatar.png",
    status: {
      emoji: "🌐",
      message: "Chase",
    },
  },

  description: "唯此薪火 永燃不熄",

  social: [
    {
      name: "RSS",
      link: "/atom.xml",
      icon: "i-ri-rss-line",
      color: "orange",
    },
    {
      name: "GitHub",
      link: "https://github.com/fanghsiu",
      icon: "i-ri-github-line",
      color: "#6e5494",
    },
    {
      name: "E-Mail",
      link: "mailto:fanghsiu@foxmail.com",
      icon: "i-ri-mail-line",
      color: "#8E71C1",
    },
    {
      name: "哔哩哔哩",
      link: "https://space.bilibili.com/424096741",
      icon: "i-ri-bilibili-line",
      color: "#FF8EB3",
    },
    {
      name: "网易云音乐",
      link: "https://music.163.com/#/user/home?id=4016357729",
      icon: "i-ri-netease-cloud-music-line",
      color: "#C20C0C",
    },
    {
      name: "Travelling",
      link: "https://www.travellings.cn/go.html",
      icon: "i-ri-train-line",
      color: "var(--va-c-text)",
    },
  ],

  search: {
    enable: true,
    type: "fuse",
  },

  comment: {
    enable: true,
  },

  sponsor: {
    enable: false,
  },

  mediumZoom: {
    enable: true,
  },

  encrypt: {
    enable: true,
  },
})
