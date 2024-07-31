<template>
  <div class="auth-page">
    <div class="auth-page__container">
      <div class="auth-page__model">
        <h1 class="text-center">Авторизация</h1>
        <p
          v-for="error in errors"
          :key="error.property"
          class="error-description"
        >
          <span v-for="constraint in error.constraints">{{ constraint }}</span>
        </p>

        <ui-input
          v-model="loginForm.email"
          placeholder="Введите email"
          input-type="email"
        />
        <ui-input
          v-model="loginForm.password"
          placeholder="Введите пароль"
          input-type="password"
        />

        <div class="auth-page__buttons">
          <ui-button
            text="Войти"
            :disabled="isLoginButtonDisabled"
            @click="loginFormSubmit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'auth'
})

// const router = useRouter()
const authStore = useAuthStore()

// const isAuth = computed(() => authStore.getIsAuth)
const errors = computed(() => authStore.getErrors)

const loginForm = ref({
  email: '',
  password: '',
})

const isLoginButtonDisabled = computed(() => !Boolean(loginForm.value.email && loginForm.value.password))

const loginFormSubmit = async () => {
  await authStore.login(loginForm.value)
}
</script>

<style lang="scss">
.auth-page {

  &__container {
    width: 100vw;
    height: 100vh;
  }

  &__model {
    display: inline-block;
    position: absolute;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 40px;
    border-radius: 5px;
    box-shadow: var(--shadow-primary);
    background: var(--background-accent);
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
