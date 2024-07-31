<template>
  <div class="default-layout">
    <div class="default-layout__grid">
      <sidebar />
      <div class="default-layout__content">
        <Header />
        
        <div class="default-layout__page">
          <NuxtPage />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
.default-layout {
  overflow: hidden;

  &__grid {
    display: flex;
  }

  &__content {
    position: relative;

    width: 100%;
    height: 100vh;

    padding: 10px;
    overflow: hidden;
  }

  &__page {
    height: calc(100vh - 20px);
    overflow-y: auto;
  }
}
</style>
