<template>
    <div class="min-h-screen">
        <div class="px-[2%] py-[4%]" :class="[currentTheme.colors.bg1]">
            <h2 class="text-4xl elms-sans" :class="currentTheme.colors.text1"> Typing Speed Test </h2>
            <p class="elms-sans text-lg mt-[2%] italic" :class="currentTheme.colors.text3"> How fast can you type? </p>
        </div>
        <div class="min-h-[2%] w-full" :class="currentTheme.colors.divider">
            <h2 class="text-[0.1rem]" :class="currentTheme.colors.text2">.</h2>
        </div>
        
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