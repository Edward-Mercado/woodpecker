<template>
    <div class="mt-[2%] p-[1%] rounded-2xl px-[2%] border-2" :class="currentTheme.colors.basicDiv">
        <p :class="currentTheme.colors.text4" class="elms-sans text-xl mr-[1%] mt-[1%]">Test Configuration:</p>
        <div class="my-[2%] border rounded-full" :class="currentTheme.colors.basicDiv"></div>
        <div v-if="mode === 'sniper'">
            <div class="flex justify-between w-full my-[1%]">
                <div class="w-[40%]">
                    <p :class="currentTheme.colors.text4" class="elms-sans text-lg mr-[1%]">Target Size: (Selected Size: {{ size }}%) </p>
                </div>
                <button class="rounded-full border-2 elms-sans px-[1%]" :class="currentTheme.colors.button1" v-for="i in [50, 75, 100, 125, 150]"
                @click="size=i">{{ i }}%</button>
            </div>
            <div class="flex flex-row items-center justify-between h-[20%]">
                <p :class="currentTheme.colors.text4" class="elms-sans text-lg mr-[1%]">Smallest </p>
                <input type="range" 
                class="w-[70%] h-full cursor-pointer appearance-none rounded-full" :class="currentTheme.colors.rangeSlider" v-model="size"
                min="50" max="150" step="1">
                <p :class="currentTheme.colors.text4" class="elms-sans text-lg mr-[1%]">Largest </p>
            </div>
            <div class="my-[2%] border rounded-full" :class="currentTheme.colors.basicDiv">
                
            </div>
        </div>

        <div v-if="mode === 'sniper'">
            <div class="flex justify-between w-full my-[1%]">
                <div class="w-[40%]">
                    <p :class="currentTheme.colors.text4" class="elms-sans text-lg mr-[1%]">Target Speed: (Selected Speed: {{ speed }}%) </p>
                </div>
                <button class="rounded-full border-2 elms-sans px-[1%]" :class="currentTheme.colors.button1" v-for="i in [50, 75, 100, 125, 150]"
                @click="speed=i">{{ i }}%</button>
            </div>
            <div class="flex flex-row items-center justify-between h-[20%]">
                <p :class="currentTheme.colors.text4" class="elms-sans text-lg mr-[1%]">Slowest </p>
                <input type="range" 
                class="w-[70%] h-full cursor-pointer appearance-none rounded-full" :class="currentTheme.colors.rangeSlider" v-model="speed"
                min="50" max="150" step="1">
                <p :class="currentTheme.colors.text4" class="elms-sans text-lg mr-[1%]">Fastest </p>
            </div>
            <div class="my-[2%] border rounded-full" :class="currentTheme.colors.basicDiv">
                
            </div>
        </div>

        <div class="flex w-full justify-between">
            <div class="flex items-center">
                <input type="text" inputmode="numeric" maxlength="5"
                    class="min-w-[15%] w-20 rounded-2xl px-[2%] elms-sans focus:outline-none text-center"
                    :class="[currentTheme.colors.bg2, currentTheme.colors.text2]" placeholder="###"
                    v-model="amountInput">
                <p class="elms-sans ml-3" :class="currentTheme.colors.text4"> time{{ pluralization }}</p>
            </div>
            <button :class="currentTheme.colors.button1"
                class="border-2 px-[1%] rounded-2xl transition-all duration-300 hover:translate-y-[-5%] active:translate-y-[5%] elms-sans w-[10%]"
                v-for="number in ['1', '3', '5', '10']" @click="amountInput = number">{{ number }}</button>
            <button :class="currentTheme.colors.button1"
                class="border-2 px-[1%] rounded-2xl transition-all duration-300 hover:translate-y-[-5%] active:translate-y-[5%] elms-sans"
                @click="createTest()">Create Test</button>
        </div>
        <div v-if="error" class="mt-[1%] text-md elms-sans italic" :class="currentTheme.colors.text4">
            # That's not a valid amount of times. Try again please!
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

const size = ref<number>(100)
const speed = ref<number>(100)

function createTest() {
    let amount = Number(amountInput.value)
    if (!(amount > 0)) {
        error.value = true
    } else emit('createGame', Math.floor(amount), size.value, speed.value)
}

const pluralization = computed(() => { if (amountInput.value === '1' || amountInput.value === '-1') return ''; else return 's' })

watch(() => amountInput.value, () => error.value = false)
</script>

<style scoped></style>