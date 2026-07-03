<template>
    <div data-aos="fade-up"
        class="mt-[4%] border-2 rounded-2xl p-[2%] justify-around items-center flex flex-col px-auto h-[45vh] w-[96%] mx-[2%]"
        :class="currentTheme.colors.basicDiv">
        <h2 class="elms-sans text-2xl" :class="currentTheme.colors.text4"> You played on {{ prop.mode }} mode. </h2>
        <div class="w-[90%] mx-[5%] h-[80%] rounded-2xl p-[2%] flex flex-col justify-around"
            :class="currentTheme.colors.bg2">
            <div>
                <h2 class="text-xl text-center elms-sans" :class="currentTheme.colors.text2"> Time Used: {{
                    (prop.time).toFixed(1) }} seconds. </h2>
                <h2 class="text-xl text-center elms-sans" :class="currentTheme.colors.text2"> Amount of Clicks: {{
                    prop.clicks }} </h2>
                <h2 class="text-xl text-center elms-sans" :class="currentTheme.colors.text2"> Final Click Speed {{
                    (prop.clicks / prop.time).toFixed(1) }} cps </h2>
            </div>
            <h2 class="text-4xl elms-sans text-center" :class="currentTheme.colors.text1"> That's as fast as a <span :class="currentTheme.colors.text3">{{getRank()}}</span>!</h2>
        </div>
    </div>
</template>

<script setup lang="ts">
const prop = defineProps<{
    time: number,
    clicks: number,
    mode: string,
}>()
let themeStore = useThemeStore()
let currentTheme = computed(() => themeStore.getActiveTheme())

function getRank() {
    let cps = prop.clicks / prop.time
    if(cps < 2) {
        return "sloth"
    } else if (cps < 4) {
        return "cat"
    } else if (cps < 6.5) {
        return "dog"
    } else if (cps < 8) {
        return "gazelle"
    } else if (cps < 10) {
        return "falcon"
    } else if (cps < 20) {
        return 'cheetah'
    } else return 'woodpecker'
}
</script>

<style scoped></style>