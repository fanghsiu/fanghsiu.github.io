<script lang='ts' setup>
import { ref, watch } from 'vue'
import { isClient } from '@vueuse/core'

interface LinkType {
  avatar: string
  name: string
  url: string
  color: string
  blog: string
  desc: string
}

const props = defineProps<{
  links: string | LinkType[]
  random: boolean
}>()

const { data } = useRandomData(props.links, props.random)

const anonymousImage = 'https://cdn.yunyoujun.cn/img/avatar/none.jpg'

function useRandomData<T>(source: string | T[], random = false) {
  const data = ref<T[]>()

  watch(() => source, async () => {
    let rawData: T[]
    if (typeof source === 'string') {
      if (!isClient)
        return
      rawData = (await fetch(source).then(res => res.json()) as T[]) || []
    }
    else { rawData = source }

    data.value = random ? Array.from(rawData).sort(() => Math.random() - 0.5) : rawData
  }, { immediate: true })

  return {
    data,
  }
}

function onImgError(e: Event, defaultImg = anonymousImage) {
  const targetEl = e.target as HTMLImageElement
  targetEl.setAttribute('data-src', targetEl.src)
  targetEl.src = defaultImg
}

</script>

<template>
  <div class="links">
    <ul class="link-items">
      <li v-for="link, i in data" :key="i" class="link-item" :style="`--primary-color: ${link.color}`">
        <a class="link-url" p="x-4 y-2" :href="link.url" :title="link.name" alt="portrait" rel="friend" target="_blank">
          <div class="link-left">
            <img class="link-avatar" w="16" h="16" loading="lazy" :src="link.avatar" :alt="link.name" :onError="onImgError">
          </div>
          <div class="link-info" m="l-2">
            <div class="link-blog" font="serif black">{{ link.blog }}</div>
            <div class="link-desc">{{ link.desc }}</div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<stye lang="scss" scoped>
.link-item {
  display: inline-flex;
}

.links {
  .link-items {
    display: flex;
    text-align: center;
    justify-content: center;
    flex-wrap: wrap;

    padding-left: 0;
  }

  .link-url {
    --smc-link-color: var(--primary-color);

    display: inline-flex;
    text-align: center;
    justify-self: center;
    line-height: 1.5;
    margin: 0.5rem;
    transition: 0.2s;
    color: var(--primary-color, black);
    border: 1px solid var(--primary-color, gray);

    &:hover {
      color: white;
      background-color: var(--primary-color, gray);
      box-shadow: 0 2px 20px var(--primary-color, gray);
    }

    .link {
      &-left {
        line-height: 0;
      }

      &-avatar {
        margin: 0;
        display: inline-flex;
        max-width: 100%;
        border-radius: 50%;
        background-color: #fff;
        border: 1px solid var(--primary-color, gray);
        transition: 0.5s;

        &:hover {
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
      }

      &-desc {
        font-size: 0.8rem;
        width: 10rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

  .link-info {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
  }
}
</stye>
