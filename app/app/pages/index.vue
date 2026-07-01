<template>
    <div class="p-[1%] h-[88%] py-[2%]" :class="[currentTheme.colors.bg1]">
        <h2 class="text-4xl elms-sans" :class="currentTheme.colors.text1"> What is Woodpecker? </h2>
    </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Woodpecker'
})

let themeStore = useThemeStore()
let currentTheme = computed(() => themeStore.getActiveTheme())
</script>

<style scoped>

</style>