<template>
    <div :class="currentTheme.colors.bg2" class="h-[12%] px-[1%] flex items-center justify-between">
        <div class="w-[25%] flex justify-center items-center flex-col">
            <h1 class="lg:text-4xl text-2xl elms-sans font-black text-center transition-all duration-100 ease-in-out" :class="currentTheme.colors.text1">woodpecker</h1>
            <h4 class="playwrite-nz lg:text-[.8rem] text-[0.55rem] text-center transition-all duration-100 ease-in-out" :class="currentTheme.colors.text3">simple tests for simple people</h4>
        </div>
        <div class="bg-black h-[90%] w-[.5%] rounded-full" :class="currentTheme.colors.bg3"></div>
        <div class="w-[69%] flex justify-around items-center h-full">
            <div class="flex w-full justify-around gap-[7.5%] h-full items-center">
                <router-link to="/" class="text-center md:text-2xl text-lg elms-sans font-black transition-all ease-in-out duration-100" :class="[currentTheme.colors.dynamicText1, themeStore.landingRoutes['/']]" data-name="/">home page</router-link>
                <router-link to="/typing-speed" class="text-center md:text-2xl text-lg elms-sans font-black transition-all ease-in-out duration-100" :class="[currentTheme.colors.dynamicText1, themeStore.landingRoutes['/typing-speed']]" data-name="typing-speed">typing speed</router-link>
                <router-link to="/click-speed" class="text-center md:text-2xl text-lg elms-sans font-black transition-all ease-in-out duration-100" :class="[currentTheme.colors.dynamicText1, themeStore.landingRoutes['/click-speed']]" data-name="click-speed">click speed</router-link>
                <router-link to="/reaction-speed" class="md:text-2xl text-lg text-center elms-sans font-black transition-all ease-in-out duration-100" :class="[currentTheme.colors.dynamicText1, themeStore.landingRoutes['/reaction-speed']]" data-name="reaction-speed">reaction speed</router-link>
                <img class="p-[0.3%] h-[80%] aspect-square border-4 rounded-3xl border-black" :class="currentTheme.colors.themePath.slice(1, currentTheme.colors.themePath.length)" :src="currentTheme.colors.themePath[0]" @click="themeStore.changeTheme()"></img>
            </div>
        </div>
    </div>
    <slot></slot>
</template>

<script setup lang="ts">
let themeStore = useThemeStore()
let currentTheme = computed(() => themeStore.getActiveTheme())
</script>

<style scoped></style>