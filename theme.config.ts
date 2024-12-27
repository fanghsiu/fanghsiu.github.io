import { defineThemeConfig } from 'valaxy-theme-yun'

export default defineThemeConfig({
  type: 'nimbo',

  banner: {
    enable: true,
    title: '前进',
  },

  say: {
    enable: true,
    api: '',
    hitokoto: {
      enable: true,
      api: 'https://v1.hitokoto.cn/?c=i&encode=json',
    }
  },

  bg_image: {
    enable: true,
    url: 'https://res.vsinger.com/images/e4a5e56fa3a1817244195f15ce5dcda9.jpg',
    dark: 'https://res.vsinger.com/images/e4a5e56fa3a1817244195f15ce5dcda9.jpg',
  },

  pages: [
    {
      name: '流光相册',
      url: '/albums',
      icon: 'i-ri-gallery-line',
    },
    {
      name: '友情链接',
      url: '/links',
      icon: 'i-ri-user-star-line',
      color: 'dodgerblue',
    },
    {
      name: '铜雀春深',
      url: '/girls',
      icon: 'i-ri-user-heart-line',
      color: 'hotpink',
    },
  ],

  footer: {
    since: 2002,
    icon: {
      enable: true,
      name: 'i-ri-cloud-line',
      animated: true,
      url: '/',
      title: '方脩',
    },
    powered: true,
    beian: {
      enable: false,
      icp: '',
    },
  },
})