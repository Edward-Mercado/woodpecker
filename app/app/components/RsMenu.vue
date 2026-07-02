<template>
    <div class="mt-[2%] p-[1%] rounded-2xl px-[2%] border-2" :class="currentTheme.colors.basicDiv">
        <h2 class="elms-sans text-md my-[1%] italic" :class="currentTheme.colors.text4"> How many times do you want to
            be tested (for averaging score)? </h2>
        <div class="flex w-full justify-between">
            <div class="flex items-center">
                <input type="text" inputmode="numeric" maxlength="5"
                    class="min-w-[15%] w-20 rounded-2xl px-[2%] elms-sans focus:outline-none text-center"
                    :class="[currentTheme.colors.bg2, currentTheme.colors.text2]" placeholder="####"
                    v-model="amountInput">
                <p class="elms-sans ml-3" :class="currentTheme.colors.text4"> test{{ pluralization }}</p>
            </div>
            <button :class="currentTheme.colors.button1"
                class="border-2 px-[1%] rounded-2xl transition-all duration-300 hover:translate-y-[-5%] active:translate-y-[5%] elms-sans w-[10%]"
                v-for="number in ['1', '3', '5', '10']" @click="amountInput = number">{{ number }}</button>
            <button :class="currentTheme.colors.button1"
                class="border-2 px-[1%] rounded-2xl transition-all duration-300 hover:translate-y-[-5%] active:translate-y-[5%] elms-sans"
                @click="createTest()">Create Game</button>
        </div>
        <div v-if="error" class="mt-[1%] text-md elms-sans italic" :class="currentTheme.colors.text4">
            # That's not a valid amount of tests. Try again please!
        </div>
        <div v-if="mode === 'sniper'" class="mt-[1%]">
            <p :class="currentTheme.colors.text4" class="elms-sans text-lg mr-[1%]">Snipe Target Size: </p>
            <div class="flex flex-row items-center justify-between h-[20%]">
                <p :class="currentTheme.colors.text4" class="elms-sans text-lg mr-[1%]">Smallest </p>
                <input type="range" 
                class="w-[70%] h-full cursor-pointer appearance-none rounded-full" :class="currentTheme.colors.rangeSlider" v-model="size"
                min="1" max="5" step="1">
                <p :class="currentTheme.colors.text4" class="elms-sans text-lg mr-[1%]">Largest </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['createGame'])
const prop = defineProps<{
    mode: string
}>()
let themeStore = useThemeStore()
let currentTheme = computed(() => themeStore.getActiveTheme())
let error = ref<boolean>(false)
let amountInput = ref<string | null>(null)

let size = ref<number>(1)

function createTest() {
    let amount = Number(amountInput.value)
    if (!(amount > 0)) {
        error.value = true
    } else emit('createGame', Math.floor(amount), size.value)
}

const pluralization = computed(() => { if (amountInput.value === '1' || amountInput.value === '-1') return ''; else return 's' })

watch(() => amountInput.value, () => error.value = false)
</script>

<style scoped></style>