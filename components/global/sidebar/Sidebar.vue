<template>
  <div class="sidebar">
    <div class="sidebar__container">
      <div class="sidebar__header">Neirodialog Admin</div>
      <div class="sidebar__navigation">
        <div
          v-for="item in navigation"
          :key="item.path"
          :class="{
            active: route.path === item.path && route.path !== '/',
            opened: item.opened
          }"
          class="sidebar-item"
          @click="onSidebarItemClick(item)"
        >
          <div class="sidebar-item__header">
            <div class="sidebar-item__name">
              <nuxt-icon
                v-if="item.icon"
                :name="item.icon"
              />
              <span>{{ item.title }}</span>
            </div>
            <div
              v-if="item.childrens?.length"
              class="sidebar-item__arrow"
            >
              <nuxt-icon name="arrow-down" />
            </div>
          </div>
          <div class="sidebar-item__body">
            <div
              v-for="child in item.childrens"
              :key="child.path"
              class="sidebar-item"
              :class="{
                active: route.path === `${item.path}${child.path}`
              }"
              @click="onSidebarItemClick(child, item)"
            >
              <div class="sidebar-item__header">
                <div class="sidebar-item__name">
                  <nuxt-icon
                    v-if="child.icon"
                    :name="child.icon"
                  />
                  <span>{{ child.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface INavigationItem {
  title: string
  icon?: string
  path: string
  childrens?: INavigationItem[]
  opened?: boolean
}

const navigation: Ref<INavigationItem[]> = ref([
  {
    title: 'Доски',
    path: '/',
    icon: 'home',
    childrens: [
      {
        title: 'Аналитика продаж',
        path: ''
      },
      {
        title: 'Предупреждения',
        path: '/dashboards/warnings',
      }
    ],
    opened: true,
  },
  {
    title: 'Пользователи',
    path: '/users',
    icon: 'users-group',
  },
  {
    title: 'Продукты',
    path: '/products',
    icon: 'cart',
    childrens: [
      {
        title: 'Разделы',
        path: '/sections'
      },
      {
        title: 'Список',
        path: '/',
      }
    ]
  },
  {
    title: 'Диллеры',
    path: '/dillers',
    icon: 'dillers',
  },
  {
    title: 'Новости',
    path: '/news',
    icon: 'docs',
  },
  {
    title: 'Страницы',
    path: '/pages',
    icon: 'empty-docs',
    childrens: [
      {
        title: 'Главная',
        path: '/'
      },
      {
        title: 'О нас',
        path: '/about'
      },
    ]
  },
  {
    title: 'Почта',
    path: '/mail',
    icon: 'mail',
  },
  {
    title: 'Чат',
    path: '/chat',
    icon: 'chat',
  },
])

const route = useRoute()
const router = useRouter()

const onSidebarItemClick = (item: INavigationItem, parent?: INavigationItem) => {
  if (item.childrens?.length) {
    const itemIndex = navigation.value.findIndex((el) => el.path === item.path)

    if (itemIndex < 0) return

    navigation.value[itemIndex].opened = navigation.value[itemIndex].opened ? false : true
    
    return
  }

  if (parent) {
    const path = `${parent.path}${item.path}`.replace('//', '/')

    return router.push(path)
  }

  router.push(item.path)
}
</script>

<style lang="scss">
.sidebar {
  max-width: 300px;
  width: 100%;
  height: 100vh;

  background: var(--background-accent);
  box-shadow: var(--shadow-primary);

  &__header {
    font-size: 24px;
    letter-spacing: 2px;
    text-align: center;
    color: var(--color-primary);
    text-shadow: 0px 0px 5px var(--color-primary);

    margin-bottom: 20px;
  }

  &__container {
    padding: 20px;
  }
}

.sidebar-item {
  max-height: 30px;
  height: 100%;

  transition: all .4s;
  margin: 5px 0;
  overflow: hidden;

  &.active {
    .sidebar-item__header {
      background: var(--color-primary);
    }

    * {
      color: var(--font-alternative)
    }
  }

  &.opened {
    max-height: 500px;

    .sidebar-item__arrow {
      transform: rotate(-180deg);
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 30px;
    
    padding: 5px;
    border-radius: 5px;

    overflow: hidden;
    transition: all .2s;
    cursor: pointer;

    &:hover {
      background: var(--background-shadow-color);
    }
  }

  &__name {
    gap: 10px;

    * {
      font-size: var(--font-size-l);
    }
  }

  &__arrow {
    transition: all .4s;
  }

  &__body {
    margin-left: 20px;
  }
}
</style>
