import type { SidebarConfig } from "@vuepress/theme-default"

export const zh: SidebarConfig = {
  "/guide/": [
    {
      text: "指南",
      children: [
        "/guide/README.md",
        "/guide/other.md",
      ],
    },
  ],
  "/provisional/": [
    {
      text: "暂定",
      children: [
        "/provisional/README.md",
      ]
    }
  ]
}