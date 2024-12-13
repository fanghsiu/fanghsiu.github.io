import { defineValaxyConfig } from 'valaxy'
import { UserThemeConfig } from 'valaxy-theme-yun'

import generateSitemap from 'vite-ssg-sitemap'

import { addonWaline } from 'valaxy-addon-waline'
import { addonLightGallery } from 'valaxy-addon-lightgallery'

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
      title: ['爱国', '敬业', '诚信', '友善'],
      cloud: {
        enable: false,
      },
    },

    say: {
      enable: false,
      api: '',
      hitokoto: {
        enable: false,
        api: '',
      }
    },

    bg_image: {
      enable: true,
      url: 'https://res.vsinger.com/images/e4a5e56fa3a1817244195f15ce5dcda9.jpg',
      dark: 'https://res.vsinger.com/images/e4a5e56fa3a1817244195f15ce5dcda9.jpg',
    },

    pages: [
      {
        name: '友人帐',
        url: '/links',
        icon: 'i-ri-user-star-line',
        color: 'dodgerblue',
      },
      {
        name: '相册',
        url: '/albums',
        icon: 'i-ri-gallery-line',
        color: '#66CCFF',
      },
      {
        name: '铜雀台',
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
  },

  unocss: { safelist },

  addons: [
    addonWaline({
      serverURL: 'https://waline.fanghsiu.top',
      cdn: 'https://jsd.onmicrosoft.cn/npm/',
    }),
    addonLightGallery(),
  ],

  vite: {
    ssgOptions: {
      onFinished() {
        generateSitemap({
          hostname: 'https://www.fanghsiu.top',
          robots: [{
            userAgent: '*',
            allow: '/',
            disallow: ['/images/qq.png', '/images/wx.png'],
          },],
        },)
      },
    },
  },
})
