---
layout: post
title: 'Python: 在 Edge 上使用 selenium'
date: 2022-01-12
updated: 2022-01-12
categories: Python
tags: [python, selenium]
---

<!-- more -->

:::tip
此处写于 2023-11-09

现在 selenium 推荐 4.12.0 版本及以上。

原因看这篇文章：<AppLink href='./selenium'>selenium</AppLink>（正好水一篇）
:::

## 微软官方文档

**官方英文文档** [Use WebDriver to automate Microsoft Edge - Microsoft Edge Development | Microsoft Docs](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/?tabs=c-sharp)

**官方中文文档** [使用 WebDriver 自动Microsoft Edge - Microsoft Edge Development | Microsoft Docs](https://docs.microsoft.com/zh-cn/microsoft-edge/webdriver-chromium/?tabs=c-sharp)

## 下载 Microsoft Edge 驱动程序

**官方驱动下载地址** [Microsoft Edge 驱动程序 - Microsoft Edge Developer](https://developer.microsoft.com/zh-cn/microsoft-edge/tools/webdriver/)

### 使用 Selenium 4

Selenium 4 内置支持 Microsoft Edge。
如果使用 Selenium 4，则无需使用 Selenium Tools for Microsoft Edge。

### 使用 Selenium 3

如果使用 Selenium 3，请使用以下步骤将 [Selenium Tools for Microsoft Edge](https://github.com/microsoft/edge-selenium-tools) 和 [Selenium 3](https://www.selenium.dev/) 添加到项目中。

使用 [pip](https://pypi.org/project/pip/) 安装 [msedge-selenium-tools](https://pypi.org/project/msedge-selenium-tools/) 和 [selenium](https://pypi.org/project/selenium/) 程序包。

```python
pip install msedge-selenium-tools==3.141.4
pip install selenium==3.141
```

Selenium使用 `EdgeDriver` 类管理Microsoft Edge会话。若要启动会话并自动Microsoft Edge，请创建一个 `EdgeDriver` 新对象，并传递一个 `EdgeOptions` 对象且将 `UseChromium` 属性设置为 true 。

```python
options = EdgeOptions()
options.use_chromium = True

driver = Edge(options = options)
```

### 自定义 Microsoft Edge Driver Service

使用 Python 时， `Edge` 对象将创建和管理 `EdgeService` 。 若要配置 `EdgeService` ，请向 对象传递 `Edge` 额外参数，如以下代码所示：

```python
service_args = ['--verbose']
driver = Edge(service_args = service_args)
```

### 使用Chromium-Specific选项

如果将 `UseChromium` 属性设置为 `true`，可以使用  `EdgeOptions` 类来访问在自动化其他Chromium浏览器时使用的相同的 [特定于 Chromium 的属性和方法](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) 

```python
options = EdgeOptions()
options.use_chromium = True
options.add_argument("headless")
options.add_argument("disable-gpu")
```

完整启动参数文档 <https://peter.sh/experiments/chromium-command-line-switches/>

### 示例

**selenium3 示例**
此示例 Selenium 版本为 3.1.4
```python
from msedge.selenium_tools import Edge, EdgeOptions

url = "https://www.baidu.com/"
options = EdgeOptions()
options.use_chromium = True
# 最大化窗口
# options.add_argument('start-maximized')
# 最小化窗口
# options.add_argument('start-minimized')
# F11 全屏
# options.add_argument('start-fullscreen')
# 无窗口运行
options.add_argument("headless")
# executable_path 为驱动程序路径
browser = Edge(executable_path='../Driver/msedgedriver.exe', options=options)
browser.get(url=url)
# 网页标题
print(browser.title)
```

**selenium4 示例**
此示例 Selenium 版本为 4.1
```python
from selenium.webdriver import Edge
from selenium.webdriver.edge.options import Options as EdgeOptions
url = "https://www.baidu.com/"
options = EdgeOptions()
options.add_argument("headless")
browser = Edge(executable_path='../Driver/msedgedriver.exe', options=options)
browser.get(url=url)
print(browser.title)
```
