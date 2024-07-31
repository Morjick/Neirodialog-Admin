<template>
  <div
    class="ui-input"
    :class="{
      invalid: !isValid,
    }"
  >

    <div
      v-if="inputType === 'search' || inputType === 'date'"
      class="ui-input__avatar"
    >
      <nuxt-icon v-if="inputType === 'search'" name="search"/>
    </div>

    <input
      v-model="value"
      :type="type"
      class="ui-input__input"
      required
      @keypress.enter="onEnter"
      @input="onChange"
    >

    <span class="ui-input__placeholder">
      {{ placeholder }}
    </span>

    <div
      class="ui-input__icons show-passowrd"
      @click="toggleShowPassword"
    >
      <nuxt-icon
        v-if="!isShowPassword && inputType === 'password'"
        name="eye-hide"
      />
      <nuxt-icon
        v-if="isShowPassword && inputType === 'password'"
        name="eye-show"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
export type TInputType = 'text' | 'password' | 'date' | 'email' | 'search'

const emit = defineEmits(['update:modelValue', 'enter'])

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Введите данные'
  },
  inputType: {
    type: String as PropType<TInputType>,
    default: 'text'
  },
  isValid: {
    type: Boolean,
    default: true,
  },
})

const value = ref('')
const delay = ref(250)
const type = ref('text')
const isShowPassword = ref(false)

const onChange = (event: any): void => {
  value.value = event.target?.value
  setTimeout(() => {
    emit('update:modelValue', value.value)
  }, delay.value)
}

const onEnter = () => {
  emit('enter', value.value)
}

const toggleShowPassword = () => {
  if (props.inputType !== 'password') return

  isShowPassword.value = !isShowPassword.value

  if (isShowPassword.value) {
    type.value = 'text'
  }

  if (!isShowPassword.value) {
    type.value = 'password'
  }
}

onMounted(() => {
  type.value = props.inputType === 'email' ? 'text' : props.inputType
})
</script>

<style lang="scss">
.ui-input {
  position: relative;

  max-width: 500px;
  min-width: 250px;
  width: 100%;
  height: 30px;

  box-shadow: var(--shadow-primary);
  background: var(--background-accent);

  margin-bottom: 15px;
  border-radius: 2px;

  &.invalid {
    box-shadow: var(--shadow-danger);

    span {
      color: var(--color-danger)
    }
  }

  &__avatar {
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
  }

  &__input {
    width: 100%;
    height: 30px;

    padding: 10px 5px;

    &:valid {
      &~span {
        transform: translateY(-120%);
      }
    }
  }

  &__placeholder {
    position: absolute;

    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    transition: all .4s;

    background: var(--background-color);

    padding: 2px;
    border-radius: 2px;

    font-size: var(--font-size-s);
  }

  &__icons {
    position: absolute;

    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
</style>
