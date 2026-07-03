<template>
    <div data-aos="fade-up" class="mt-[4%] border-2 rounded-2xl p-[2%] justify-between items-center flex flex-col px-auto min-h-[45vh] w-[96%] mx-[2%]" 
        :class="currentTheme.colors.basicDiv">
        <h2 class="elms-sans text-center text-xl" :class="currentTheme.colors.text4" v-if="!testBegun"> Click the button below to start.
        </h2>
        <button :class="currentTheme.colors.button1" class="w-full border-2 rounded-2xl transition-all ease-in-out duration-300 hover:translate-y-[-5%] active:translate-y-[5%] elms-sans py-[5%] text-4xl" v-if="!testBegun" @click="createNextTest()">Begin Test</button>
        <SimpleTarget v-if="targetVisible && mode==='simple'"
        @test-finish="(reactionScore) => handleCompletion(reactionScore)"></SimpleTarget>
        <SniperTarget v-if="targetVisible && mode==='sniper'" :size="testSize / 100" :speed="testSpeed / 100"
        :testNum="testAmount"
        @testEnd="(reactionScores) => $emit('testFinish', reactionScores)"
        ></SniperTarget>
    </div>
</template>

<script setup lang="ts">
let themeStore = useThemeStore()
let currentTheme = computed(() => themeStore.getActiveTheme())

const prop = defineProps<{
    testAmount: number,
    testSpeed: number,
    testSize: number,
    mode: string
}>()

const emit = defineEmits(['testFinish'])

const testBegun = ref<boolean>(false)
const targetVisible = ref<boolean>(false)

let reactionTimes = ref<number[]>([])

let testsRemaining = ref<number>(prop.testAmount)

async function createNextTest() {
    if(!testBegun.value) testBegun.value = true
    targetVisible.value = false
    await nextTick()
    targetVisible.value = true
    testsRemaining.value--
}

async function handleCompletion(reactionScore:number) {
    reactionTimes.value.push(reactionScore)
    console.log(testsRemaining.value)
    if(testsRemaining.value > 0) createNextTest()
    else {
        targetVisible.value = false
        emit('testFinish', reactionTimes.value)
    }
}

</script>

<style scoped>

</style>