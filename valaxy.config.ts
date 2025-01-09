import { defineValaxyConfig } from 'valaxy'
import { UserThemeConfig } from 'valaxy-theme-yun'

import generateSitemap from 'vite-ssg-sitemap'

import { addonWaline } from 'valaxy-addon-waline'
import { addonLightGallery } from 'valaxy-addon-lightgallery'
import { addonMeting } from 'valaxy-addon-meting'

// add icons what you will need
const safelist = [
  'i-ri-home-line',
]

// User Config
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts or write in siteConfig
  // siteConfig: {},

  theme: 'yun',
  // see theme.config.ts or write in themeConfig
  // themeConfig in theme.config.ts
  // themeConfig: {},

  unocss: { safelist },

  addons: [
    addonWaline({
      serverURL: 'https://waline.fanghsiu.top',
    }),
    addonLightGallery(),
    addonMeting({
      global: true,
      /** @see https://github.com/metowolf/MetingJS */
      props: {
        id: '8554469081',
        server: 'netease',
        type: 'playlist',
        autoplay: true,
        volume: 0.2,
      },
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
            disallow: ['/images/qq.png', '/images/wx.png'],
          },],
        },)
      },
    },
  },
})
