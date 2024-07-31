<template>
  <div class="header">
    <div class="header__navigation">
      <div class="header__item"><nuxt-icon name="notification" /></div>
      <div class="header__item"><nuxt-icon name="calendar" /></div>
    </div>
    <div class="header__user">
      <ui-user-snippet />
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  position: fixed;
  right: 10px;
  top: 10px;

  max-width: 250px;
  width: 100%;

  padding: 5px 10px;
  border-radius: 5px;

  background: var(--background-accent);
  box-shadow: var(--shadow-primary);

  &__search {
    .ui-input {
      min-width: 100px;

      margin-bottom: 0;
    }
  }

  &__navigation {
    display: flex;
    align-items: center;

    gap: 5px;
    margin-right: 20px;

    .nuxt-icon svg {
      font-size: var(--font-size-icon);
    }
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 30px;
    height: 30px;

    border-radius: 50%;
    padding: 5px;

    cursor: pointer;
    transition: all .2s;

    &:hover {
      background: var(--background-shadow-color);
    }
  }

  &__user {
    flex-shrink: 0;
  }
}
</style>
