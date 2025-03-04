---
layout: post
title: Selenium
date: 2023-11-09
updated: 2023-11-10
categories: [Python]
tags: [python, selenium]
end: true
---

## 我的其他相关文章

<AppLink href='./python-using-selenium-on-edge'>Python: 在 Edge 上使用 selenium</AppLink>

## 关于 Selenium Manager

selenium 自 4.6 版本开始，内置了 Selenium Manager 会自动下载 chromedriver/msedgedriver 缓存用与运行。

<p style="color:red">也就是说可以不用再手动下载 chromedriver/msedgedriver 等驱动。如果你愿意，你仍可以手动指定驱动路径。</p>

在 Selenium 4.11.0 提供了 Selenium Manager 非常相关的新功能：支持 Chrome for Testing （CfT） 端点，用于 chromedriver 管理和自动 Chrome 管理（也基于 CfT）。[What's new in Selenium Manager with Selenium 4.11.0 | Selenium](https://www.selenium.dev/blog/2023/whats-new-in-selenium-manager-with-selenium-4.11.0/)

从 Selenium 4.12.0 开始，Selenium Manager 将遵循与 Selenium 相同的版本。尽管如此，由于 Selenium Manager 仍处于测试阶段，因此其主要版本为 0。因此，Selenium 4.12.0 随 Selenium Manager 0.4.12 一起提供。[What's new in Selenium Manager 0.4.12, shipped with Selenium 4.12.0 | Selenium](https://www.selenium.dev/blog/2023/whats_new_in_selenium_manager_0.4.12_shipped_with_selenium_4.12.0/)

:::tip
**推荐版本：selenium 4.12 及以上**

- 自此版本起，selenium manager 版本与 selenium 一致。
  - 感觉之前没有版本号，就连更新日志都是从 0.14.2 版本开始的。[changelog file](https://github.com/SeleniumHQ/selenium/blob/trunk/rust/CHANGELOG.md)
- 自 selenium 4.11 版本起，内置的 selenium manager 支持 chrome for testing。
  - 使用 chrome 的话，selenium 4.11 之前，从 chromedriver.storage.googleapis.com 查询下载 chromedriver，这个网站在中国联不通；而 selenium 4.11.0及之后的版本可以从 googlechromelabs.github.io 查询下载，联的通。
:::

---

## 浏览器驱动下载

### msedgedriver.exe 下载

[Microsoft Edge WebDriver - Microsoft Edge Developer](https://developer.microsoft.com/zh-cn/microsoft-edge/tools/webdriver/)

全部版本：[Microsoft Edge - Webdriver](https://msedgewebdriverstorage.z22.web.core.windows.net/)

### chromedriver.exe 下载

[ChromeDriver - WebDriver for Chrome - Downloads](https://chromedriver.chromium.org/downloads) (latest version: 114.0.5735.90)

[Chrome for Testing availability](https://googlechromelabs.github.io/chrome-for-testing/) (version: 115.0.5763.0 - now)

CfT 下载方法：在下面 JSON API endpoints 的 known-good-versions-with-downloads.json 搜索你的版本号，存在的话根据平台替换版本号进行下载，不然就找最接近你的版本的。

JSON API endpoints：
| Endpoint | Descriptio |
| -------- | ---------- |
| [known-good-versions.json](https://googlechromelabs.github.io/chrome-for-testing/known-good-versions.json) | The versions for which all CfT assets are available for download. Useful for bisecting. |
| [known-good-versions-with-downloads.json](https://googlechromelabs.github.io/chrome-for-testing/known-good-versions-with-downloads.json) | Same as above, but with an extra `downloads` property for each version, listing the full download URLs per asset. |
| [last-known-good-versions.json](https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions.json) | The latest versions for which all CfT assets are available for download, for each Chrome release channel (Stable/Beta/Dev/Canary). |
| [last-known-good-versions-with-downloads.json](https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions-with-downloads.json) | Same as above, but with an extra `downloads` property for each channel, listing the full download URLs per asset. |
| [latest-patch-versions-per-build.json](https://googlechromelabs.github.io/chrome-for-testing/latest-patch-versions-per-build.json) | The latest versions for which all CfT assets are available for download, for each known combination of `MAJOR.MINOR.BUILD` versions. |
| [latest-patch-versions-per-build-with-downloads.json](https://googlechromelabs.github.io/chrome-for-testing/latest-patch-versions-per-build-with-downloads.json) | Same as above, but with an extra `downloads` property for each version, listing the full download URLs per asset. |
| [latest-versions-per-milestone.json](https://googlechromelabs.github.io/chrome-for-testing/latest-versions-per-milestone.json) | The latest versions for which all CfT assets are available for download, for each Chrome milestone. |
| [latest-versions-per-milestone-with-downloads.json](https://googlechromelabs.github.io/chrome-for-testing/latest-versions-per-milestone-with-downloads.json) | Same as above, but with an extra `downloads` property for each milestone, listing the full download URLs per asset. |

各平台下载链接：
| Platform | URL |
| -------- | --- |
| linux64 | https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/{version}/linux64/chromedriver-linux64.zip |
| mac-arm64 | https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/{version}/mac-arm64/chromedriver-mac-arm64.zip |
| mac-x64 | https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/{version}/mac-x64/chromedriver-mac-x64.zip |
| win32 | https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/{version}/win32/chromedriver-win32.zip |
| win64 | https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/{version}/win64/chromedriver-win64.zip |

---

## 参考文档
- [Selenium Manager (Beta) | Selenium](https://www.selenium.dev/documentation/selenium_manager/)
- [What's new in Selenium Manager with Selenium 4.11.0 | Selenium](https://www.selenium.dev/blog/2023/whats-new-in-selenium-manager-with-selenium-4.11.0/)
- [What's new in Selenium Manager 0.4.12, shipped with Selenium 4.12.0 | Selenium](https://www.selenium.dev/blog/2023/whats_new_in_selenium_manager_0.4.12_shipped_with_selenium_4.12.0/)
