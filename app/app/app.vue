<template>
  <div class="h-screen overscroll-none" :class="[currentTheme.colors.bg2, currentTheme.colors.selection]">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
onMounted(async () => {
  const AOS = (await import('aos')).default
  await import('aos/dist/aos.css')

  AOS.init()
})

const route = useRoute()

watch(() => route.fullPath, (newPath) => {
  for(let value in themeStore.landingRoutes) {
    themeStore.landingRoutes[value] = null
  }
  themeStore.landingRoutes[route.fullPath] = themeStore.activeTheme.colors.activeRoute
})

const themeStore = useThemeStore()
const currentTheme = computed(() => themeStore.getActiveTheme())
  
onMounted(() => {
  if(localStorage.getItem('themeName')) {
    themeStore.activeThemeName = localStorage.getItem("themeName")
    themeStore.getActiveTheme()
  }
})

useHead(() => ({
  title: 'Woodpecker',
  bodyAttrs: {
    class: currentTheme.value.colors.bg2,
  },
  htmlAttrs: {
    class: currentTheme.value.colors.bg2,
  },
}))
</script>