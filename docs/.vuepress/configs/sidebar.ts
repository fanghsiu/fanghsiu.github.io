import type { SidebarConfig } from "@vuepress/theme-default"

export const zh: SidebarConfig = {
  "/guide/": [
    {
      text: "指南",
      children: [
        "/guide/README.md",
        "/guide/1.md"
      ],
    },
  ],
}