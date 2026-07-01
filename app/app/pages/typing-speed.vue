<template>
    <div class="p-[1%] h-full py-[2%]" :class="[currentTheme.colors.bg1]">
        <h2 class="text-4xl elms-sans" :class="currentTheme.colors.text1"> Typing Speed Test </h2>
    </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Typing Speed: Woodpecker'
})

let themeStore = useThemeStore()
let currentTheme = computed(() => themeStore.getActiveTheme())
</script>

<style scoped>

</style>