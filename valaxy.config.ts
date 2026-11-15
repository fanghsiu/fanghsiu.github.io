import { defineValaxyConfig } from "valaxy"
import { UserThemeConfig } from "valaxy-theme-yun"

import { addonWaline } from "valaxy-addon-waline/index.js"
import { addonLightGallery } from "valaxy-addon-lightgallery"

// add icons what you will need
const safelist = [
  "i-ri-home-line",
]

// User Config
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts or write in siteConfig
  // siteConfig: {},

  theme: "yun",
  // see theme.config.ts or write in themeConfig
  // themeConfig in theme.config.ts
  // themeConfig: {},

  unocss: { safelist },

  addons: [
    addonWaline({
      serverURL: "https://waline.fanghsiu.cn"
    }),
    addonLightGallery(),
  ],

  markdown: {
    lineNumbers: true,
  },

  groupIcons: {
    customIcon: {}
  }
})
