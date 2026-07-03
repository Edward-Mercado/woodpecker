<template>
    <div class="w-[50%] aspect-square rounded-2xl border-2 p-[2%]" :class="currentTheme.colors.basicDiv">
        <div class="aspect-square rounded-full w-[7%] transform ease-in-out duration-300 hover:border-4" :class="[sizeClass, currentTheme.colors.sniperTarget]">
            
        </div>
    </div>
</template>

<script setup lang="ts">
const prop = defineProps<{
    size: number
    speed: number
}>()
let themeStore = useThemeStore()
let currentTheme = computed(() => themeStore.getActiveTheme())

const sizeClass = computed(() => `scale-[${Number(prop.size.toFixed(2))}]`)

const placeX = ref<string>(`mx-[${Math.floor(Math.random() * 100)}]`)
const placeY = ref<string>(`my-[${Math.floor(Math.random() * 100)}]`)

</script>

<style scoped>

</style>