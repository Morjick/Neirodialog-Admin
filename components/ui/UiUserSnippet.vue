<template>
  <div
    v-if="user"
    class="ui-user-snippet"
    @click="openUserSnippet"
  >
    <div class="ui-user-snippet__header">
      <div class="ui-user-snippet__avatar"></div>
      <div class="ui-user-snippet__description">
        <div class="ui-user-snippet__name">{{ user.firstname }} {{ user.lastname }}</div>
        <div class="ui-user-snippet__role">{{ user.role }}</div>
      </div>
    </div>

    <div
      class="ui-user-snippet__body"
      :class="{
        active: isOpened,
      }"
    >
      <div class="ui-user-snippet__navigation">
        <div class="ui-user-snippet__point">
          <nuxt-icon name="admin" />
          <span>Профили</span>
        </div>
        <div class="ui-user-snippet__point">
          <nuxt-icon name="settings" />
          <span>Настройки</span>
        </div>
      </div>
      <div class="ui-user-snippet__buttons">
        <ui-button
          text="Выйти"
          type="danger"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()

const user = computed(() => authStore.getUser)

const isOpened = ref(false)

const openUserSnippet = () => {
  isOpened.value = true

  setTimeout(() => {
    isOpened.value = false
  }, 1600)
}
</script>

<style lang="scss">
.ui-user-snippet {
  position: relative;

  cursor: pointer;

  &__header {
    display: flex;

    gap: 10px;
  }

  &__avatar {
    width: 35px;
    height: 35px;

    border-radius: 50%;
    background: var(--font-secondary);
  }

  &__role {
    font-size: var(--font-size-s);
    color: var(--font-secondary);
  }

  &__body {
    position: absolute;
    top: calc(100% + 10px);

    width: 100%;

    border-radius: 2px;
    background: var(--background-accent);
    box-shadow: var(--shadow-primary);
    transition: all .2s;

    transform: translateY(-20px);
    opacity: 0;
    pointer-events: none;

    &.active, &:hover {
      transform: translateY(0);
      opacity: 1;
      pointer-events: all;
    }
  }

  &__navigation {
    margin: 0 5px 0;
    padding: 5px 0;
    border-bottom: 1px solid var(--font-secondary);
  }

  &__point {
    display: flex;
    align-items: center;

    gap: 5px;
    padding: 5px;

    border-radius: 2px;
    transition: all .2s;

    &:hover {
      background: var(--background-shadow-color);
    }
  }

  &__buttons {
    display: flex;
    align-items: center;

    width: 100%;

    padding: 5px;

    .ui-button {
      width: 100%;
    }
  }
}
</style>
