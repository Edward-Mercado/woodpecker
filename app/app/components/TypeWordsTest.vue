<template>
    <div data-aos="fade-up" class="mt-[4%] border-2 rounded-2xl p-[2%] justify-between items-center flex flex-col px-auto min-h-[45vh] w-[96%] mx-[2%]" :class="currentTheme.colors.basicDiv">
        words test
    </div>
</template>

<script setup lang="ts">

let themeStore = useThemeStore()
let currentTheme = computed(() => themeStore.getActiveTheme())

</script>

<style scoped>

</style>