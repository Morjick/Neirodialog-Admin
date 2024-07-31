<template>
  <div
    :class="[
      type,
      {
        disabled,
      }
    ]"
    class="ui-button"
    @click="onClickEmiter"
  >
    <div class="ui-button__inner">
      <span
        class="ui-button__icon"
        v-if="icon && icon.length"
      >
        <nuxt-icon :name="icon" />
      </span>
      <span class="ui-button__text">{{ text }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
export type TButtonType = 'primary' | 'outlined' | 'danger'

const emit = defineEmits(['click'])

const props = defineProps({
  text: {
    type: String,
    default: 'Подтверить'
  },
  icon: {
    type: String,
    default: ''
  },
  type: {
    type: String as PropType<TButtonType>,
    default: 'primary'
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const onClickEmiter = () => {
  if (props.disabled) return

  return emit('click')
}
</script>

<style lang="scss">
.ui-button {
  display: inline-block;

  max-width: 180px;
  min-width: 80px;

  border-radius: 2px;
  cursor: pointer;
  transition: opacity .4s;

  box-shadow: var(--shadow-primary);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 5px 15px;
    gap: 10px;
  }

  &.primary {
    background: var(--color-primary);
    color: var(--font-alternative);

    span {
      font-weight: 500;
      color: var(--font-alternative);
    }
  }

  &.danger {
    background: var(--color-danger);
    color: var(--font-alternative);

    transition: background .2s;

    span {
      font-weight: 500;
      color: var(--font-alternative);
    }

    &:hover {
      background: var(--color-danger-light);
    }
  }

  &.disabled {
    opacity: .5;
    pointer-events: none;
  }

  &__icon {
    .nuxt-icon svg {
      font-size: var(--font-size-icon);
    }
  }
}
</style>
