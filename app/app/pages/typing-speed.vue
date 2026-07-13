<template>
    <div class="min-h-screen pb-[5%]">
        <div class="px-[2%] py-[4%]" :class="[currentTheme.colors.bg1]">
            <h2 class="text-4xl elms-sans" :class="currentTheme.colors.text1"> Typing Speed Test </h2>
            <p class="elms-sans text-lg mt-[2%] italic" :class="currentTheme.colors.text3"> How fast can you type? </p>
            <div :class="currentTheme.colors.basicDiv" class="rounded-2xl border-2 p-[1%] mt-[2%]">
                <div class="w-full flex justify-between">
                    <button :class="[currentTheme.colors.button1, timedModeClass]"
                        class="border-2 rounded-2xl p-[1%] w-[30%] elms-sans text-xl transition-all duration-300 ease-in-out hover:translate-y-[-5%] active:translate-y-[5%]"
                        @click="currentMode = 'timed'">
                        Timed Mode</button>
                    <button :class="[currentTheme.colors.button1, wordsModeClass]"
                        class="border-2 rounded-2xl p-[1%] w-[30%] elms-sans text-xl transition-all duration-300 ease-in-out hover:translate-y-[-5%] active:translate-y-[5%]"
                        @click="currentMode = 'words'">
                        Words Mode</button>
                    <button :class="[currentTheme.colors.button1, quoteModeClass]"
                        class="border-2 rounded-2xl p-[1%] w-[30%] elms-sans text-xl transition-all duration-300 ease-in-out hover:translate-y-[-5%] active:translate-y-[5%]"
                        @click="currentMode = 'quote'">
                        Quote Mode</button>
                </div>
                <TsTimedMenu v-if="currentMode === 'timed'"
                @createGame="(mode, args) => {typeTestStore.resetState(); typeTestStore.createTest(mode, args)}"
                ></TsTimedMenu>
                <TsWordsMenu v-if="currentMode === 'words'"
                @createGame="(mode, args) => {typeTestStore.resetState(); typeTestStore.createTest(mode, args)}"></TsWordsMenu>
                <TsQuoteMenu v-if="currentMode ==='quote'"
                @createGame="(mode, args) => {typeTestStore.resetState(); typeTestStore.createTest(mode, args)}"></TsQuoteMenu>
            </div>
        </div>
        <div class="min-h-[2%] w-full" :class="currentTheme.colors.divider">
            <h2 class="text-[0.1rem]" :class="currentTheme.colors.text2">.</h2>
        </div>
       <TypeQuoteTest v-if="typeTestStore.showTest && currentMode === 'quote'"></TypeQuoteTest>
       <TypeTimeTest v-if="typeTestStore.showTest && currentMode === 'timed'"></TypeTimeTest>
       <TypeWordsTest v-if="typeTestStore.showTest && currentMode === 'words'"></TypeWordsTest>
    </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Typing Speed: Woodpecker'
})

let themeStore = useThemeStore()
let typeTestStore = useTypeTestStore()
let currentTheme = computed(() => themeStore.getActiveTheme())

const currentMode = ref<('words' | 'timed' | 'quote' | 'none')>('none')

function getClass(mode: string) {
    if (mode === currentMode.value) {
        return currentTheme.value.colors.button1Active
    } else return currentTheme.value.colors.button1Unactive
}

const timedModeClass = computed(() => getClass('timed'))
const wordsModeClass = computed(() => getClass('words'))
const quoteModeClass = computed(() => getClass('quote'))
</script>

<style scoped>

</style>