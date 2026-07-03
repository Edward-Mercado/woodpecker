<template>
    <div class="mt-[2%] p-[1%] rounded-2xl px-[2%] border-2" :class="currentTheme.colors.basicDiv">
        <div class="w-full justify-between flex-row flex">   
            <p :class="currentTheme.colors.text4" class="elms-sans text-xl mr-[1%] mt-[1%] w-[50%]">Test Configuration:</p>
            <button class="border-2 elms-sans px-[1%] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-[5%] active:translate-y-[5%]" :class="currentTheme.colors.button1" @click="useRecSettings()"> Use Recommended Settings </button>
        </div>
        <div class="my-[2%] border rounded-full" :class="currentTheme.colors.basicDiv"></div>

        <p :class="currentTheme.colors.text4" class="elms-sans text-xl mr-[1%] my-[.5%]">Time</p>
        <div class="flex w-full justify-between mb-[1%]">
            <div class="flex items-center">
                <input type="text" inputmode="numeric" maxlength="5"
                    class="min-w-[15%] w-20 rounded-2xl px-[2%] elms-sans focus:outline-none text-center"
                    :class="[currentTheme.colors.bg2, currentTheme.colors.text2]" placeholder="###"
                    v-model="minutesInput">
                <p class="elms-sans ml-3" :class="currentTheme.colors.text4"> minute{{ minutesPluralization }}</p>
            </div>
            <button :class="currentTheme.colors.button1"
                class="border-2 px-[1%] rounded-2xl transition-all duration-300 hover:translate-y-[-5%] active:translate-y-[5%] elms-sans w-[10%]"
                v-for="number in ['0', '1', '2', '5']" @click="minutesInput = number">{{ number }}</button>
        </div>

        <div class="flex w-full justify-between">
            <div class="flex items-center">
                <input type="text" inputmode="numeric" maxlength="5"
                    class="min-w-[15%] w-20 rounded-2xl px-[2%] elms-sans focus:outline-none text-center"
                    :class="[currentTheme.colors.bg2, currentTheme.colors.text2]" placeholder="###"
                    v-model="secondsInput">
                <p class="elms-sans ml-3" :class="currentTheme.colors.text4"> second{{ secondsPluralization }}</p>
            </div>
            <button :class="currentTheme.colors.button1"
                class="border-2 px-[1%] rounded-2xl transition-all duration-300 hover:translate-y-[-5%] active:translate-y-[5%] elms-sans w-[10%]"
                v-for="number in ['0', '15', '30', '60']" @click="secondsInput = number">{{ number }}</button>
        </div>
        <div v-if="secondsError && minutesError" class="mt-[1%] text-md elms-sans italic" :class="currentTheme.colors.text4">
            # That's not a valid amount of time. Try again please!
        </div>
        <div class="my-[2%] border rounded-full" :class="currentTheme.colors.basicDiv"></div>
        <p :class="currentTheme.colors.text4" class="elms-sans text-xl mr-[1%] my-[.5%]">Language</p>
        <div class="flex w-full lg:justify-between justify-around mb-[1%] flex-wrap gap-y-2">
            <button class="border-2 px-[1%] rounded-2xl transition-all duration-300 hover:translate-y-[-5%] active:translate-y-[5%] elms-sans lg:w-[10%] w-[30%] break-all"
            :class="[currentTheme.colors.button1,
        selectedLanguage === language
            ? [currentTheme.colors.button2Active]
            : currentTheme.colors.button1Unactive
    ]"
            v-for="language in ['English', 'Spanish', 'Italian', 'German', 'French', 'Portuguese', 'Romanian']" @click="selectedLanguage = language">{{ language }}</button>
        </div>
        <div class="my-[2%] border rounded-full" :class="currentTheme.colors.basicDiv"></div>
        <p :class="currentTheme.colors.text4" class="elms-sans text-xl mr-[1%] my-[.5%]">Extra</p>
        <div class="flex w-full justify-between mb-[1%] flex-wrap gap-y-2">
            <button class="border-2 px-[1%] rounded-2xl transition-all duration-300 hover:translate-y-[-5%] active:translate-y-[5%] elms-sans w-[30%]"
            :class="[currentTheme.colors.button1,
            useNumbers === true ? [currentTheme.colors.button2Active] : currentTheme.colors.button1Unactive]"
            @click="useNumbers = !useNumbers">Use Numbers</button>
            <button class="border-2 px-[1%] rounded-2xl transition-all duration-300 hover:translate-y-[-5%] active:translate-y-[5%] elms-sans w-[30%]"
            :class="[currentTheme.colors.button1,
            usePunctuation === true ? [currentTheme.colors.button2Active] : currentTheme.colors.button1Unactive]"
            @click="usePunctuation = !usePunctuation">Use Punctuation</button>
            <button class="border-2 px-[1%] rounded-2xl transition-all duration-300 hover:translate-y-[-5%] active:translate-y-[5%] elms-sans w-[30%]"
            :class="[currentTheme.colors.button1,
            capitalizeWords === true ? [currentTheme.colors.button2Active] : currentTheme.colors.button1Unactive]"
            @click="capitalizeWords = !capitalizeWords">Capitalize Words</button>
        </div>
        <div class="my-[2%] border rounded-full" :class="currentTheme.colors.basicDiv"></div>
        <button class="border-2 px-[1%] rounded-2xl transition-all duration-300 hover:translate-y-[-5%] active:translate-y-[5%] elms-sans w-full"
            :class="currentTheme.colors.button1"
            @click="createTest()">Create Test</button>
    </div>
</template>

<script setup lang="ts">
import { L } from 'vue-router/dist/index-BQLwgiyK.js'

const emit = defineEmits(['createGame'])

let themeStore = useThemeStore()
let currentTheme = computed(() => themeStore.getActiveTheme())
let secondsError = ref<boolean>(false)
let minutesError = ref<boolean>(false)
let secondsInput = ref<string | null>(null)
let minutesInput = ref<string | null>(null)
let selectedLanguage = ref<string | null>('English')
let useNumbers = ref<boolean>(false)
let usePunctuation = ref<boolean>(false)
let capitalizeWords = ref<boolean>(false)

function createTest() {
    let seconds = Number(secondsInput.value)
    let minutes = Number(minutesInput.value)
    if (!(seconds > 0)) secondsError.value = true
    
    if (!(minutes > 0)) minutesError.value = true

    if((seconds === 0) && !minutesError.value) secondsError.value = false

    if((!secondsError.value) && (!minutesError.value)
    && (selectedLanguage.value)
    ) {} // EMIT
    
}

const minutesPluralization = computed(() => { if (minutesInput.value === '1' || minutesInput.value === '-1') return ''; else return 's' })
const secondsPluralization = computed(() => { if (secondsInput.value === '1' || secondsInput.value === '-1') return ''; else return 's' })

watch(() => secondsInput.value, () => secondsError.value = false)
watch(() => minutesInput.value, () => minutesError.value = false)

function useRecSettings() {
    minutesInput.value = '1'
    secondsInput.value = '30'
    selectedLanguage.value = "English"
    useNumbers.value = true
    usePunctuation.value = false
    capitalizeWords.value = true
}
</script>

<style scoped></style>