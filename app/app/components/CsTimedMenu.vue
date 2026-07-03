<template>
    <div class="mt-[2%] p-[1%] rounded-2xl px-[2%] border-2" :class="currentTheme.colors.basicDiv">
        <div class="w-full justify-between flex-row flex">   
            <p :class="currentTheme.colors.text4" class="elms-sans text-xl mr-[1%] mt-[1%] w-[50%]">Test Configuration:</p>
            <button class="border-2 elms-sans px-[1%] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-[5%] active:translate-y-[5%]" :class="currentTheme.colors.button1" @click="useRecSettings()"> Use Recommended Settings </button>
        </div>
        <div class="my-[2%] border rounded-full" :class="currentTheme.colors.basicDiv"></div>
        <div class="flex w-full justify-between">
            <div class="flex items-center">
                <input type="text" inputmode="numeric" maxlength="5" class="min-w-[15%] w-20 rounded-2xl px-[2%] elms-sans focus:outline-none text-center" :class="[currentTheme.colors.bg2, currentTheme.colors.text2]" placeholder="###" v-model="timeInput"> 
                <p class="elms-sans ml-3" :class="currentTheme.colors.text4"> second{{ pluralization }}</p>
            </div>
            <button :class="currentTheme.colors.button1" class="border-2 px-[1%] rounded-2xl transition-all duration-300 hover:translate-y-[-5%] active:translate-y-[5%] elms-sans w-[10%]"
            v-for="number in ['1', '5', '10', '20']"
            @click="timeInput = number"
            >{{ number }}s</button>
            <button :class="currentTheme.colors.button1" class="border-2 px-[1%] rounded-2xl transition-all duration-300 hover:translate-y-[-5%] active:translate-y-[5%] elms-sans"
            @click="createTest()"
            >Create Test</button>
        </div>
        <div v-if="error" class="mt-[1%] text-md elms-sans italic" :class="currentTheme.colors.text4">
            # That's not a valid amount of time. Try again please!
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['createTest'])
let themeStore = useThemeStore()
let currentTheme = computed(() => themeStore.getActiveTheme())
let error = ref<boolean>(false)
let timeInput = ref<string | null>(null)

function createTest() {
    let seconds = Number(timeInput.value)
    if(!(seconds > 0)) {
        error.value = true
    } else emit('createTest', Math.floor(seconds))
}

watch(() => timeInput.value, () => error.value = false)

const pluralization = computed(() => {if(timeInput.value === '1' || timeInput.value === '-1') return ''; else return 's'})

function useRecSettings() {
    timeInput.value = '5'
}
</script>

<style scoped>

</style>