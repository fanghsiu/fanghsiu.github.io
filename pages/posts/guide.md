---
layout: post
title: 指南
date: 2024-02-02
updated: 2024-03-28
categories: [笔记]
tags: [2FA, Windows terminal]
---

记录一些问题及解决方法。

## Windows terminal
Windows terminal 使用 Gitbash 时闪烁问题  
新建`~/.inputrc`文件, 写入`set bell-style none`或`set bell-style audible`.  
[GIT Bash has bad flicker · Issue #7200 · microsoft/terminal](https://github.com/microsoft/terminal/issues/7200)

## 2FA-GitHub
![2fa warn](https://s21.ax1x.com/2024/03/28/pFoYViV.png)
早上一打开 GitHub 就看到了要求强制 2FA 的提示，烦死了。我认为 2FA 简直就是反人类的设计。但是人在屋檐下，不得不低头，GitHub 还得用，还是得开。

随便找了个 chrome 扩展应付了。下载 recovery-codes，然后扩展导出备份，就这样吧。 

扩展网址：[身份验证器](https://chrome.google.com/webstore/detail/bhghoamapcdpbohphigoooaddinpkbai)
