import { defineThemeConfig } from "valaxy-theme-yun"

export default defineThemeConfig({
  type: "nimbo",

  banner: {
    enable: true,
    title: "前进",
  },

  say: {
    enable: false,
    api: "",
    hitokoto: {
      enable: true,
      api: "https://v1.hitokoto.cn/?c=i&encode=json",
    }
  },

  bg_image: {
    enable: true,
    url: "/images/background.jpg",
    dark: "/images/background.jpg",
    opacity: 0.25,
  },

  nav:[
    // { text: '博客文章', link: '/page/1', icon: 'i-ri-article-line' },
    { text: '归档', link: '/archives', icon: 'i-ri-archive-line' },
    { text: '分类', link: '/categories', icon: 'i-ri-folder-2-line' },
    { text: '标签', link: '/tags', icon: 'i-ri-price-tag-3-line' },
    { text: '相册', link: '/albums', icon: 'i-ri-gallery-line' },
    { text: '友情链接', link: '/links', icon: 'i-ri-user-star-line' },
    { text: '红颜列表', link: '/girls', icon: 'i-ri-user-heart-line' },
    // { text: '赞助者们', link: '/sponsors', icon: 'i-ri-heart-fill' },
  ],

  pages: [
    // {
    //   name: "归档",
    //   url: "/archives",
    //   icon: "i-ri-archive-line"
    // },
    // {
    //   name: "分类",
    //   url: "/categories",
    //   icon: "i-ri-folder-2-line"
    // },
    // {
    //   name: "标签",
    //   url: "/tags",
    //   icon: "i-ri-price-tag-3-line"
    // },
    {
      name: "流光相册",
      url: "/albums",
      icon: "i-ri-gallery-line",
      color: "#006CD0"
    },
    {
      name: "友情链接",
      url: "/links",
      icon: "i-ri-user-star-line",
      color: "dodgerblue",
    },
    {
      name: "铜雀春深",
      url: "/girls",
      icon: "i-ri-user-heart-line",
      color: "hotpink",
    },
  ],

  footer: {
    since: 2002,
    icon: {
      enable: true,
      name: "i-ri-cloud-line",
      animated: true,
      url: "/",
      title: "方脩",
    },
    powered: true,
    beian: {
      enable: false,
      icp: "",
    },
  },
})