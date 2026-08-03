<template>
  <!--
    广告位占位组件。
    注意：不要使用空的 `<template />` 作为根节点——SSG 时会在 HTML 中留下
    `<template></template>`，客户端水合时会因 replaceChild(null, template)
    抛错导致整个应用挂载失败（评论区等 ClientOnly 内容将不显示）。
    如需投放广告，请在这里填写你的广告代码。
  -->
  <div class="yun-ad-board" />
</template>
