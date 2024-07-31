<template>
  <div class="page-header">
    <div class="page-header__title">
      <span>{{ pageDescription }}</span>
      <h1>{{ pageTitle }}</h1>
    </div>
    <ui-button
      :text="buttonText"
      icon="plus"
      @click="onButtonClick"
    />
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['button-click'])

defineProps({
  pageTitle: {
    type: String,
    default: 'Заголовок страницы',
  },
  pageDescription: {
    type: String,
    default: 'Описание страницы'
  },
  buttonText: {
    type: String,
    default: 'Создать',
  },
})

const onButtonClick = () => emit('button-click')
</script>

<style lang="scss">
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  max-width: calc(100% - 260px);
  width: 100%;

  margin-bottom: 20px;

  &__title {
    span {
      color: var(--font-secondary);
      font-size: var(--font-size-s);
    }

    h1 {
      margin-bottom: 0;
    }
  }
}
</style>
