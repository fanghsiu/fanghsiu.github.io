---
# layout: Post
title: 图床
date: 2023-12-28
updated: 2024-12-06
# categories: []
tags: [图床]
cover: https://s21.ax1x.com/2024/12/06/pATsFBR.jpg
---

<!-- more -->

## vercel 反代 jsdelivr
vercel 反代 jsdelivr，速度感觉还不错。  
参考[荣6的jsDelivr镜像站](https://jsd.nmmsl.top/)
:::info
[luotianyi_swimsuit_compress](https://cdn.fanghsiu.top/gh/fanghsiu/cdn/images/luotianyi_swimsuit_compress.jpg) ( 583KB )
:::
![luotianyi_swimsuit_compress](https://cdn.fanghsiu.top/gh/fanghsiu/cdn/images/luotianyi_swimsuit_compress.jpg "luotianyi_swimsuit_compress")


## github pages 
单纯的Github直链很慢，利用GitHub自带的pages进行部署。速度感觉没快多少。
:::info
[luotianyi_swimsuit_compress](https://fanghsiu.github.io/cdn/images/luotianyi_swimsuit_compress.jpg) ( 583KB )
:::
![luotianyi_swimsuit_compress](https://fanghsiu.github.io/cdn/images/luotianyi_swimsuit_compress.jpg "luotianyi_swimsuit_compress")


## vercel
直接部署到vercel，需要一个域名国内才能访问，你也可以选择netlify。比github pages更快。  
因为每次部署会重新拉取全部文件，感觉很费事，所以我没有这么做，就不放图了。  
图片链接应该像这样`https://域名/一级目录/···/文件`

## 路过图床
https://imgse.com/  
[关于我们 - 路过图床](https://imgse.com/page/about)  
[服务条款 - 路过图床](https://imgse.com/page/tos)<div color='red'>不让放卡通漫画(包括ACG/二次元/动漫游戏等)。</div>  
:::info
[pATsFBR](https://s21.ax1x.com/2024/12/06/pATsFBR.jpg) ( 340KB )
:::
![pATsFBR.jpg](https://s21.ax1x.com/2024/12/06/pATsFBR.jpg "pATsFBR.jpg")

## jsdelivr镜像站
在 jsdelivr 备案还在的时候还是很好的,现在已经不太好用了.不过可以用 cloudflare workers 做反代,大图片挺慢的,压缩一下还好.

介绍个国内镜像站 https://blog.jsdmirror.com<br>[使用规定](https://blog.jsdmirror.com/3.html)  
只需将 https://cdn.jsdelivr.net 修改为 境内站: https://cdn.jsdmirror.com
:::info
[luotianyi_swimsuit_compress](https://cdn.jsdmirror.com/gh/fanghsiu/cdn@main/images/luotianyi_swimsuit_compress.jpg) ( 583KB )
:::
![luotianyi_swimsuit_compress](https://cdn.jsdmirror.com/gh/fanghsiu/cdn@main/images/luotianyi_swimsuit_compress.jpg "luotianyi_swimsuit_compress")



[登录 | PicX](https://picx.xpoet.cn/)  PicX 是一款基于 GitHub API 开发的图床工具,提供图片上传托管、生成图片链接和常用图片工具箱服务,可以直接复制那个镜像站链接,挺不错的.

## 超星网盘
[图床 | 把 “学习通” 当图床 （教程/免费图床）](https://mp.weixin.qq.com/s?__biz=MzkzODYwODIxMQ==&mid=2247483808&idx=1&sn=ec4fff98f6380be691fec371d317fe24&chksm=c2fcd29cf58b5b8a6874e5167223c37af744648f8c9e19c4627002b35d82a8e6caf24d6e54d8&scene=132&exptype=timeline_recommend_article_extendread_samebiz#wechat_redirect)  
在微信上看到的,试了一下,真的可以. 不过只有 10G 作为图床够用了. 界面简洁,网页上传复制直链,挺不错的.  
删除图片后，图片链接依旧可以使用。eg: https://p.ananas.chaoxing.com/star3/origin/4075d4b59a9884847399d4ab8e8db9e1.png  
不清楚能维持多久
:::tip
3.56MB　　luotianyi_swimsuit  
2024-06-17 最近加了 referrer 检测，直接使用会 403，可以设置 `referrerpolicy="no-referrer"` 绕过。（好像还限速了）
```html
<img referrerpolicy="no-referrer" 
src="https://p.ananas.chaoxing.com/star3/origin/9a481b69cf39dbc421c962958240507c.png"/>
```
:::

<pic src="https://p.ananas.chaoxing.com/star3/origin/9a481b69cf39dbc421c962958240507c.png" alt="luotianyi_swimsuit" caption="luotianyi_swimsuit"/>

