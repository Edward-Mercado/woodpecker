<template>
  <div class="h-screen overscroll-none" :class="currentTheme.colors.bg2">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>

const route = useRoute()

watch(() => route.fullPath, (newPath) => {
  for(let value in themeStore.landingRoutes) {
    themeStore.landingRoutes[value] = null
  }
  themeStore.landingRoutes[route.fullPath] = themeStore.activeTheme.colors.activeRoute
})

const themeStore = useThemeStore()
const currentTheme = computed(() => themeStore.getActiveTheme())

useHead({
  title: 'Woodpecker',
  bodyAttrs: {
    class: currentTheme.value.colors.bg2
  }
})

</script>