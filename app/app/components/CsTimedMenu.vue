<template>
    <div class="mt-[2%] p-[1%] rounded-2xl border-2" :class="currentTheme.colors.basicDiv">
        Timed Mode Menu
    </div>
</template>

<script setup lang="ts">
let themeStore = useThemeStore()
let currentTheme = computed(() => themeStore.getActiveTheme())
</script>

<style scoped>

</style>