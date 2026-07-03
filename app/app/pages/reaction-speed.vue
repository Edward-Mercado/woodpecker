<template>
    <div class="min-h-screen pb-[5%]">
        <div class="px-[2%] py-[4%]" :class="[currentTheme.colors.bg1]">
            <h2 class="text-4xl elms-sans" :class="currentTheme.colors.text1"> Reaction Speed Test </h2>
            <p class="elms-sans text-lg mt-[2%] italic" :class="currentTheme.colors.text3"> How fast can you react? </p>
            <div :class="currentTheme.colors.basicDiv" class="rounded-2xl border-2 p-[1%] mt-[2%]">
                <div class="w-full flex justify-between">
                    <button :class="[currentTheme.colors.button1, simpleClass]"
                        class="border-2 rounded-2xl p-[1%] w-[48%] elms-sans text-xl transition-all duration-300 ease-in-out hover:translate-y-[-5%] active:translate-y-[5%]"
                        @click="currentMode = 'simple'">
                        Simple Mode</button>
                    <button :class="[currentTheme.colors.button1, sniperClass]"
                        class="border-2 rounded-2xl p-[1%] w-[48%] elms-sans text-xl transition-all duration-300 ease-in-out hover:translate-y-[-5%] active:translate-y-[5%]"
                        @click="currentMode = 'sniper'">
                        Sniper Mode</button>
                </div>
                <RsMenu v-if="currentMode !== 'none'" @create-game="async (amount, size, speed) => {showTest = false; testComplete = false; await nextTick(); testSize = size; testAmount = amount; testSpeed = speed; showTest = true}"
                :mode="currentMode"></RsMenu>
            </div>
        </div>
        <div class="min-h-[2%] w-full" :class="currentTheme.colors.divider">
            <h2 class="text-[0.1rem]" :class="currentTheme.colors.text2">.</h2>
        </div>
        <ReactionTest v-if="showTest" :mode="currentMode" :testAmount="testAmount" :testSize="testSize" :testSpeed="testSpeed"
        @test-finish="(reactionTimes) => handleTestFinish(reactionTimes)"
        ></ReactionTest>
        <ReactionResult :mode="currentMode" :reactionTimes="reactionTimes" v-if="testComplete"></ReactionResult>
    </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Reaction Speed: Woodpecker'
})

let themeStore = useThemeStore()
let currentTheme = computed(() => themeStore.getActiveTheme())
let testComplete = ref<boolean>(false)
let reactionTimes = ref<number[]>([])

let showTest = ref<boolean>(false)
let testAmount = ref<number>(1)
let testSize = ref<number>(1)
let testSpeed = ref<number>(1)

const currentMode = ref<('none' | 'simple' | 'sniper')>('none')

function getClass(mode: string) {
    if (mode === currentMode.value) {
        return currentTheme.value.colors.button1Active
    } else return currentTheme.value.colors.button1Unactive
}

let simpleClass = computed(() => getClass("simple"))
let sniperClass = computed(() => getClass("sniper"))

watch(() => currentMode.value, () => { showTest.value = false; testComplete.value = false})

function handleTestFinish(reactionScores:number[]) {
    reactionTimes.value = reactionScores
    testComplete.value = true
    showTest.value = false
}
</script>

<style scoped>

</style>