<template>
  <div class="default-page">
    <page-header
      page-title="Новости"
      page-description="Список новостей, взаимодействие с новостями"
      button-text="Создать новость"
    />

    <div class="content">
      <div class="content__table">
        <ui-table
          :titles="newsTableTitles"
          :items="news"
          :total-count="totalNewsCount"
          :is-loading="isLoaded"
        >
          <template #id="item: INews">
            {{ item.id }}
          </template>
          <template #title="item: INews">
            {{ item.title }}
          </template>
          <template #autor="item: INews">
            {{ item.autor.fullname }}
          </template>
          <template #tags="item: INews">
            <div>
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="tag"
              >{{ tag }}</span>
            </div>
          </template>
          <template #status="item: INews">
            <ui-status
              :value="item.published ? statusList[0] : statusList[1]"
              :items="statusList"
              @change="(status) => onNewsStatusChange(status, item)"
            />
          </template>
          <template #href="item: INews">
            <nuxt-link :to="item.slug">{{ item.slug }}</nuxt-link>
          </template>
          <template #whatchs="item: INews">
            <span>{{ item.whatchs || 0 }}</span>
          </template>
        </ui-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PageHeader from '~/components/global/header/PageHeader.vue'
import type { IUiStatusItem } from '~/components/ui/UiStatus.vue'
import type { IUiTableTitle } from '~/components/ui/UiTable.vue'
import type { IAutor } from '~/stores/authStore'

export interface INews {
  id: number
  commentsID: number[] | null
  tags: string[]
  title: string
  description: string
  body: string
  autorID: number
  autor: IAutor
  published: boolean
  slug: string
  whatchs: number
  avatar: string
  createdAt: string
  updatedAt: string
}

const newsTableTitles: IUiTableTitle[] = [
  {
    title: 'ID',
    width: 2,
    isSorting: true,
    slug: 'id',
  },
  {
    title: 'Название',
    width: 30,
    isSorting: true,
    slug: 'title',
  },
  {
    title: 'Автор',
    width: 10,
    slug: 'autor',
  },
  {
    title: 'Теги',
    width: 10,
    slug: 'tags',
    icon: 'tag'
  },
  {
    title: 'Статус',
    width: 10,
    slug: 'status',
  },
  {
    title: 'Ссылка',
    width: 10,
    slug: 'href',
  },
  {
    title: 'Просмотры',
    width: 7,
    slug: 'whatchs',
    isSorting: true,
    icon: 'eye-hide'
  },
]
const statusList: IUiStatusItem[] = [
  {
    title: 'Опубликован',
    type: 'good'
  },
  {
    title: 'Скрыт',
    type: 'danger'
  }
]

const isLoaded = ref(false)
const news: Ref<INews[]> = ref([])
const totalNewsCount = ref(0)

const getNews = async () => {
  try {
    const result = await useApi('news/get-news')

    if ('body' in result) {
      news.value = result.body.news
      totalNewsCount.value = result.body.totalCount
    }
  } catch (e) {

  } finally {
    isLoaded.value = true
  }
}

const onNewsStatusChange = (status: IUiStatusItem, item: INews) => {
  console.log(item, status)
}

onMounted(async () => {
  await getNews()
})
</script>

<style lang="scss">
// .index- {}
</style>
