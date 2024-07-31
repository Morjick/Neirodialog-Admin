<template>
  <div
    class="ui-status"
    :class="{
      active: isOpen,
    }"
  >
    <div
      class="ui-status__header"
      :class="[value.type]"
      @click="onOpen"
    >{{ value.title || 'Не установлен' }}</div>
    <div class="ui-status__body">
      <div
        v-for="item in items"
        :key="item.title"
        :title="item.description"
        class="ui-status__item"
        @click="onChange(item)"
      >{{ item.title }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
export type IUiStatusType = 'noraml' | 'danger' | 'warning' | 'good'

export interface IUiStatusItem {
  title: string
  type: IUiStatusType
  description?: string
}

const emit = defineEmits(['change'])

defineProps({
  value: {
    type: Object as PropType<IUiStatusItem>,
    default: (): IUiStatusItem => ({ title: 'Не установлен', type: 'noraml' })
  },
  items: {
    type: Array as PropType<IUiStatusItem[]>,
    default: (): IUiStatusItem[] => []
  }
})

const isOpen = ref(false)

const onChange = (status: IUiStatusItem) => {
  emit('change', {
    status,
  })
}

const onOpen = () => {
  isOpen.value = true

  setTimeout(() => isOpen.value = false, 600)
}
</script>

<style lang="scss">
.ui-status {
  position: relative;

  &.active {
    .ui-status__body {
      transform: translateY(0);
      pointer-events: all;
      opacity: 1;
    }
  }

  &__header {
    padding: 2px 5px;

    border-radius: 5px;
    border: 1px solid var(--font-secondary);

    cursor: pointer;

    &.good {
      background: var(--color-good);
      border: 1px solid var(--color-good);
      box-shadow: 0 0 2px 1px var(--color-good);
    }

    &.danger {
      background: var(--color-danger);
      border: 1px solid var(--color-danger);
      box-shadow: 0 0 2px 1px var(--color-danger);
    }
  }

  &__body {
    position: absolute;
    width: 100%;

    top: calc(100%);
    margin-top: 5px;

    background: var(--background-accent);
    box-shadow: var(--shadow-primary);
    border-radius: 2px;
    z-index: 5;

    overflow: hidden;
    pointer-events: none;
    opacity: 0;
    transform: translateY(-20px);
    transition: all .2s;

    &:hover {
      transform: translateY(0);
      pointer-events: all;
      opacity: 1;
    }
  }

  &__item {
    padding: 2px 5px;
    border-bottom: 1px dashed var(--font-thrity);

    transition: all .2s;
    cursor: pointer;

    &:hover {
      background: var(--background-shadow-color);
    }
  }
}
</style>
