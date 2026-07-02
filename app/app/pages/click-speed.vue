<template>
    <div class="min-h-screen">
        <div class="px-[2%] py-[4%]" :class="[currentTheme.colors.bg1]">
            <h2 class="text-4xl elms-sans" :class="currentTheme.colors.text1"> Click Speed Test </h2>
            <p class="elms-sans text-lg mt-[2%] italic" :class="currentTheme.colors.text3"> How fast can you click? </p>
            <div :class="currentTheme.colors.basicDiv" class="rounded-2xl border-2 p-[1%] mt-[2%]">
                <div class="w-full flex justify-between">
                    <button :class="[currentTheme.colors.button1, timedModeClass]"
                        class="border-2 rounded-2xl p-[1%] w-[48%] elms-sans text-xl transition-all duration-300 ease-in-out hover:translate-y-[-5%] active:translate-y-[5%]"
                        @click="currentMode = 'timed'">
                        Timed Mode</button>
                    <button :class="[currentTheme.colors.button1, clickModeClass]"
                        class="border-2 rounded-2xl p-[1%] w-[48%] elms-sans text-xl transition-all duration-300 ease-in-out hover:translate-y-[-5%] active:translate-y-[5%]"
                        @click="currentMode = 'click'">
                        Click Mode</button>
                </div>
                <CsTimedMenu v-if="currentMode === 'timed'" @create-test="async (time) => {showTest = false; await nextTick(); showTest = true; testEnded = false; testQuantity = time}"></CsTimedMenu>
                <CsClickMenu v-else-if="currentMode === 'click'" @create-test="async (clicks) => {showTest = false; await nextTick(); showTest = true; testEnded = false; testQuantity = clicks}"></CsClickMenu>
            </div>
        </div>
        <div class="min-h-[2%] w-full" :class="currentTheme.colors.divider">
            <h2 class="text-[0.1rem]" :class="currentTheme.colors.text2">.</h2>
        </div>
        <ClickTest v-if="showTest" :testQuantity="testQuantity" :mode="currentMode"
        @click-end="(time, clicks, cps) => endTest(clicks, time, cps)"
        @timed-end="(time, clicks, cps) => endTest(clicks, time, cps)"
        ></ClickTest>
        <ClickResult v-if="testEnded"
        :time="testResultProps.time"
        :clicks="testResultProps.clicks"
        :mode="testResultProps.mode"
        ></ClickResult>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Clicking Speed: Woodpecker'
})

function getClass(mode: string) {
    if (mode === currentMode.value) {
        return currentTheme.value.colors.button1Active
    } else return currentTheme.value.colors.button1Unactive
}

let timedModeClass = computed(() => getClass('timed'))
let clickModeClass = computed(() => getClass('click'))

let testQuantity = ref<number>(0)
let showTest = ref<boolean>(false)
let testEnded = ref<boolean>(false)

let themeStore = useThemeStore()
let currentTheme = computed(() => themeStore.getActiveTheme())

const currentMode = ref<('none' | 'timed' | 'click')>('none')

watch(() => currentMode.value, () => {showTest.value = false ; testEnded.value = false ; testQuantity.value = 0})

let testResultProps = reactive({
    time: 0,
    clicks: 0,
    cps: 0,
    mode: "none"
})

function endTest(time:number, clicks:number, cps:number) {
    console.log(time, clicks, cps)
    testResultProps.time = time
    testResultProps.clicks = clicks
    testResultProps.cps = cps
    testResultProps.mode = currentMode.value

    showTest.value = false
    testEnded.value = true
}

</script>

<style scoped></style>