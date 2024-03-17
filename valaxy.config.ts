import { defineValaxyConfig } from 'valaxy'
import type { UserThemeConfig } from 'valaxy-theme-yun'
import { addonWaline } from 'valaxy-addon-waline'

import generateSitemap from 'vite-ssg-sitemap'

// add icons what you will need
const safelist = [
  'i-ri-home-line',
]

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts or write in siteConfig
  siteConfig: {},

  theme: 'yun',
  themeConfig: {
    banner: {
      enable: true,
      // title: '永恒轮回的不沉之船',
      title: ['天一生水','地六成之'],
      cloud: {
        enable: true,
      },
    },

    say: {
      enable: false,
      api: '',
      hitokoto: {
        enable: false,
        api: ''
      }
    },

    bg_image: {
      enable: true,
      url: 'https://res.vsinger.com/images/e4a5e56fa3a1817244195f15ce5dcda9.jpg',
      dark: 'https://res.vsinger.com/images/e4a5e56fa3a1817244195f15ce5dcda9.jpg',
      // dark: 'https://gukaifeng.cn/img/bg.jpg',
      opacity: 0.35
    },

    pages: [
      {
        name: '友人帐',
        url: '/links',
        // icon: 'i-ri-genderless-line',
        icon: 'i-ri-user-star-line',
        color: 'dodgerblue',
      },
      {
        name: '铜雀台',
        url: '/girls',
        // icon: 'i-ri-women-line',
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
        color: '#66ccff',
        url: '/',
        title: '方脩',
      },
      powered: true,
      beian: {
        enable: false,
        icp: '',
      },
    },
  },

  unocss: { safelist },

  addons: [
    addonWaline({
      serverURL: 'https://waline.fanghsiu.top',
      emoji: ['//npm.onmicrosoft.cn/@waline/emojis@1.2.0/alus/'],
    })
  ],

  vite: {
    ssgOptions: {
      onFinished() {
        generateSitemap({
          hostname: 'https://www.fanghsiu.top',
          robots: [{
            userAgent: '*',
            allow: '/',
            disallow: ['/images/qq.png','/images/wx.png'],
          }]
        })
      },
    },
  }
})
