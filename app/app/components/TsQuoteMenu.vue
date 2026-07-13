<template>
    <div class="mt-[2%] p-[1%] rounded-2xl px-[2%] border-2" :class="currentTheme.colors.basicDiv">
        <div class="w-full justify-between flex-row flex">   
            <p :class="currentTheme.colors.text4" class="elms-sans text-xl mr-[1%] mt-[1%] w-[50%]">Test Configuration:</p>
            <button class="border-2 elms-sans px-[1%] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-[5%] active:translate-y-[5%]" :class="currentTheme.colors.button1" @click="useRecSettings()"> Use Recommended Settings </button>
        </div>
        <div class="my-[2%] border rounded-full" :class="currentTheme.colors.basicDiv"></div>
        
        <p :class="currentTheme.colors.text4" class="elms-sans text-md italic mr-[1%] my-[1%]">English is currently the only supported language for Quote Mode.</p>
        <div class="flex w-full justify-between mb-[1%] flex-wrap gap-y-2">
            <button class="border-2 px-[1%] rounded-2xl transition-all duration-300 hover:translate-y-[-5%] active:translate-y-[5%] elms-sans w-[30%]"
            :class="[currentTheme.colors.button1,
            allLowercase === true ? [currentTheme.colors.button2Active] : currentTheme.colors.button1Unactive]"
            @click="allLowercase = !allLowercase">All Lowercase</button>
            <button class="border-2 px-[1%] rounded-2xl transition-all duration-300 hover:translate-y-[-5%] active:translate-y-[5%] elms-sans w-[30%]"
            :class="[currentTheme.colors.button1,
            usePunctuation === true ? [currentTheme.colors.button2Active] : currentTheme.colors.button1Unactive]"
            @click="usePunctuation = !usePunctuation">Use Punctuation</button>
            <button class="border-2 px-[1%] rounded-2xl transition-all duration-300 hover:translate-y-[-5%] active:translate-y-[5%] elms-sans w-[30%]"
            :class="[currentTheme.colors.button1,
            showAuthor === true ? [currentTheme.colors.button2Active] : currentTheme.colors.button1Unactive]"
            @click="showAuthor = !showAuthor">Show Author</button>
            
        </div>
        <div class="my-[2%] border rounded-full" :class="currentTheme.colors.basicDiv"></div>
        <button class="border-2 px-[1%] rounded-2xl transition-all duration-300 hover:translate-y-[-5%] active:translate-y-[5%] elms-sans w-full"
            :class="currentTheme.colors.button1"
            @click="createTest()">Create Test</button>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['createGame'])

let themeStore = useThemeStore()
let currentTheme = computed(() => themeStore.getActiveTheme())

useTypeTestStore().resetState()

let allLowercase = ref<boolean>(false)
let usePunctuation = ref<boolean>(false)
let showAuthor = ref<boolean>(false)

function createTest() {
    emit('createGame', 'quote', [allLowercase.value, usePunctuation.value, showAuthor.value])
}

function useRecSettings() {
    showAuthor.value = true
    usePunctuation.value = true
    allLowercase.value = false
}
</script>

<style scoped></style>