<template>
  <div class="ui-table">
    <div class="ui-table__inner">
      <div class="ui-table__header ui-table-header">
        <div class="ui-table-header__inner">
          <ui-button
            text="Фильтры"
            icon="filter"
          />
          <div class="ui-table-header__search">
            <ui-input
              input-type="search"
              placeholder="Введите название или теги"
            />
          </div>
          <div class="ui-table-header__count">
            <span v-if="isLoading">Всего записей: {{ totalCount }}</span>
            <span
              v-else
              class="flex center"
            >
              <span>Загрузка</span>
              <img
                class="ui-table-header__loading"
                src="~/assets/animations/loading.gif"
                alt=""
              >
            </span>
          </div>
        </div>
      </div>
      <div class="ui-table__body ui-table-body">
        <div
          class="ui-table-body__titles"
          v-if="titles.length"
        >
          <div
            v-for="item in titles"
            :key="item.title"
            :style="`width: calc(${item.width}%)`"
            :class="{
              pointer: item.isSorting
            }"
            class="ui-table-body__title"
          >
            <nuxt-icon v-if="item.icon" :name="item.icon" />
            <span>{{ item.title }}</span>
            <nuxt-icon v-if="item.isSorting" name="arrow-down" />
          </div>
        </div>
        <div class="ui-table-body__grid">
          <div
            class="ui-table-body__item"
            v-for="(item, index) in items"
            :key="item.id"
          >
            <div
              v-for="title in titles"
              :key="title.slug"
              :style="`width: calc(${title.width}%)`"
              class="ui-table-body__param"
            >
              <slot
                :name="title.slug"
                v-bind="item"
              />
            </div>
            <div class="ui-table-body__param--actions">
              <span @click="onAction('edit', item)" class="edit">Редактировать</span>
              <span @click="onAction('delete', item)" class="delete">Удалить</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface IUiTableTitle {
  title: string
  width: number
  isSorting?: boolean
  slug: string
  icon?: string
}

export type TActionType = 'edit' | 'delete'

defineProps({
  titles: {
    type: Array as PropType<IUiTableTitle[]>,
    default: (): IUiTableTitle[] => []
  },
  items: {
    type: Array as PropType<any[]>,
    default: (): any[] => []
  },
  totalCount: {
    type: Number,
    default: 0
  },
  isLoading: {
    type: Boolean,
    default: true,
  }
})

const emit = defineEmits(['action'])

const onAction = (type: TActionType, item: any) => {
  emit('action', { type, item })
}

</script>

<style lang="scss" scoped>
.ui-table {
  border-radius: 5px;
  margin: 5px;
  background: var(--background-accent);
  box-shadow: var(--shadow-primary);
}

.ui-table-header {
  padding: 5px;

  &__inner {
    display: flex;
    align-items: center;
    gap: 10px;
  
    .ui-input {
      margin-bottom: 0;
    }
  }

  &__count {
    display: flex;
    align-items: center;

    margin-left: auto;
    color: var(--color-primary);
    
    span {
      font-size: var(--font-size-l);
    }
  }

  &__loading {
    display: block;
    width: 40px;
  }
}

.ui-table-body {
  
  &__titles {
    display: flex;
    align-items: center;

    padding: 0 5px;
    gap: 10px;
    
    border-top: 1px solid var(--font-thrity);
    border-bottom: 1px solid var(--font-thrity);
    background: var(--background-shadow-color);
  }

  &__title {
    display: flex;
    align-items: center;

    border-right: 1px solid var(--font-thrity);
    padding: 5px 0;

    span {
      color: var(--font-secondary);
      margin-right: 2px;
    }
  }

  &__grid {
    padding: 0 5px;
  }

  &__item {
    display: flex;

    padding: 5px;

    border-bottom: 1px dashed var(--font-thrity);

    &:last-child {
      border-bottom: none;
    }
  }

  &__param {
    flex-shrink: 0;
    padding: 0 5px;
    margin-right: 10px;

    &--actions {
      display: flex;
      align-items: center;

      gap: 10px;
      cursor: pointer;
      
      .edit {
        color: var(--color-primary);
      }

      .delete {
        color: var(--color-danger);
      }
    }
  }
}
</style>
