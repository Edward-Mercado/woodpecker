<template>
    <div :class="currentTheme.colors.bg2" class="h-[10%] px-[1%] flex items-center justify-between">
        <div class="w-[25%] flex justify-center items-center flex-col">
            <h1 class="lg:text-4xl text-2xl elms-sans font-black" :class="currentTheme.colors.text1">woodpecker</h1>
            <h4 class="playwrite-nz lg:text-md text-[0.6rem]" :class="currentTheme.colors.text3">simple tests for simple
                people</h4>
        </div>
        <div class="bg-black h-[90%] w-[.5%] rounded-full" :class="currentTheme.colors.bg3"></div>
        <div class="w-[69%] flex justify-around items-center">
            <div class="w-[25%]">
                <h2 class="text-2xl elms-sans font-black text-center" :class="currentTheme.colors.text2">different tests:</h2>
            </div>
            <div class="flex w-[75%] justify-around gap-[7.5%]">
                <h2 class="text-center text-2xl elms-sans font-black transition-all ease-in-out duration-300" :class="[currentTheme.colors.dynamicText1]" data-name="typing-speed" @click="changeRoute('typing-speed')">typing speed</h2>
                <h2 class="text-center text-2xl elms-sans font-black transition-all ease-in-out duration-300" :class="[currentTheme.colors.dynamicText1]" data-name="click-speed" @click="changeRoute('click-speed')">click speed</h2>
                <h2 class="text-2xl text-center elms-sans font-black transition-all ease-in-out duration-300" :class="[currentTheme.colors.dynamicText1]" data-name="reaction-speed" @click="changeRoute('reaction-speed')">reaction speed</h2>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
let themeStore = useThemeStore()
let currentTheme = computed(() => themeStore.getActiveTheme())

function changeRoute(routeName:string) {
    let path:string = `/${routeName}`
    return navigateTo(path)
}
</script>

<style scoped></style>