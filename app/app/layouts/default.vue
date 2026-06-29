<template>
    <div :class="currentTheme.colors.bg2">
        hi
    </div>
</template>

<script setup lang="ts">
let themeStore = useThemeStore()
let currentTheme = computed(() => themeStore.getActiveTheme())
</script>

<style scoped>

</style>