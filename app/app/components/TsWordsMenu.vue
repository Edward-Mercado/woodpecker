<template>
    <div class="mt-[2%] p-[1%] rounded-2xl px-[2%] border-2" :class="currentTheme.colors.basicDiv">
        <div class="w-full justify-between flex-row flex">   
            <p :class="currentTheme.colors.text4" class="elms-sans text-xl mr-[1%] mt-[1%] w-[50%]">Test Configuration:</p>
            <button class="border-2 elms-sans px-[1%] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-[5%] active:translate-y-[5%]" :class="currentTheme.colors.button1" @click="useRecSettings()"> Use Recommended Settings </button>
        </div>
        <div class="my-[2%] border rounded-full" :class="currentTheme.colors.basicDiv"></div>

        <p :class="currentTheme.colors.text4" class="elms-sans text-xl mr-[1%] my-[.5%]">Words</p>

        <div class="flex w-full justify-between">
            <div class="flex items-center">
                <input type="text" inputmode="numeric" maxlength="5"
                    class="min-w-[15%] w-20 rounded-2xl px-[2%] elms-sans focus:outline-none text-center"
                    :class="[currentTheme.colors.bg2, currentTheme.colors.text2]" placeholder="###"
                    v-model="wordsInput">
                <p class="elms-sans ml-3" :class="currentTheme.colors.text4"> word{{ wordsPluralization }}</p>
            </div>
            <button :class="currentTheme.colors.button1"
                class="border-2 px-[1%] rounded-2xl transition-all duration-300 hover:translate-y-[-5%] active:translate-y-[5%] elms-sans w-[10%]"
                v-for="number in ['10', '25', '50', '100']" @click="wordsInput = number">{{ number }}</button>
        </div>
        <div v-if="wordsError" class="mt-[1%] text-md elms-sans italic" :class="currentTheme.colors.text4">
            # That's not a valid amount of words. Try again please!
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
const emit = defineEmits(['createGame'])

let themeStore = useThemeStore()
let currentTheme = computed(() => themeStore.getActiveTheme())
let wordsError = ref<boolean>(false)
let wordsInput = ref<string | null>(null)
let selectedLanguage = ref<string | null>('English')
let useNumbers = ref<boolean>(false)
let usePunctuation = ref<boolean>(false)
let capitalizeWords = ref<boolean>(false)

function createTest() {
    let words = Number(wordsInput.value)
    if (!(words > 0)) wordsError.value = true
    
    if((!wordsError.value)
    && (selectedLanguage.value)
    ) {} // EMIT
    
}

const wordsPluralization = computed(() => { if (wordsInput.value === '1' || wordsInput.value === '-1') return ''; else return 's' })

watch(() => wordsInput.value, () => wordsError.value = false)

function useRecSettings() {
    wordsInput.value = '50'
    selectedLanguage.value = 'English'
    useNumbers.value = true
    usePunctuation.value = false
    capitalizeWords.value = true
}
</script>

<style scoped></style>