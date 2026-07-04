<template>
    <div class="w-full h-full flex flex-row justify-between">
        <div class="w-[50%] aspect-square rounded-2xl border-2 p-[2%] relative" :class="currentTheme.colors.basicDiv">
            <div v-if="targetReady" @click="handleClick()"
                class="aspect-square rounded-full w-[7%] transform ease-in-out duration-300 hover:border-4 absolute"
                :class="[sizeClass, currentTheme.colors.sniperTarget, placeX, placeY]">

            </div>
        </div>
        <div class="border-2 min-h-full w-[40%] p-[1%] rounded-2xl overflow-y-scroll no-scrollbar"
            :class="currentTheme.colors.bg2">
            <h2 class="elms-sans text-2xl" :class="currentTheme.colors.text1"> YOUR SCORES </h2>
            <h2 class="elms-sans text-lg" :class="currentTheme.colors.text3" v-for="score in targetScores"> {{ score
                }} ms </h2>
        </div>
    </div>
</template>

<script setup lang="ts">
const prop = defineProps<{
    size: number
    speed: number
    testNum: number
}>()

const emit = defineEmits(['testEnd'])
let themeStore = useThemeStore()
let currentTheme = computed(() => themeStore.getActiveTheme())

const testNumber = ref<number>(1)
const totalTests = ref<number>(prop.testNum)

const targetReady = ref<boolean>(false)
const targetScores = ref<number[]>([])

const sizeClass = computed(() => `scale-[${Number(prop.size.toFixed(2))}]`)

const placeX = ref<string>(`left-[${Math.min(Math.floor(Math.random() * 80)+5,90)}%]`)
const placeY = ref<string>(`top-[${Math.min(Math.floor(Math.random() * 80)+5,90)}%]`)

const startTime = ref<number>(0)
const endTime = ref<number>(0)

const earlyCalls = ref<number[]>([])

let spawnTimeout = setTimeout(() => {
        startTime.value = Date.now()
        targetReady.value = true
    }, Math.floor((Math.random() * 3000) / prop.speed))

watch(() => testNumber.value, () => {
    spawnTimeout = setTimeout(() => {
        startTime.value = Date.now()
        targetReady.value = true
    }, Math.floor((Math.random() * 3000) / prop.speed))
})

function handleClick() {
    endTime.value = Date.now()
    targetScores.value.push(endTime.value - startTime.value)
    targetReady.value = false
    placeX.value = `left-[${Math.floor(Math.random() * 100)}%]`
    placeY.value = `top-[${Math.floor(Math.random() * 100)}%]`
    earlyCalls.value.push(0)
    clearTimeout(spawnTimeout)
    if(testNumber.value === totalTests.value) emit('testEnd', targetScores.value, earlyCalls.value)
    else testNumber.value++
}

</script>

<style scoped></style>