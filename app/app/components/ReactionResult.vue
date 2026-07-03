<template>
    <div data-aos="fade-up"
        class="mt-[4%] border-2 rounded-2xl p-[2%] justify-around items-center flex flex-col px-auto h-[45vh] w-[96%] mx-[2%]"
        :class="currentTheme.colors.basicDiv">
        <h2 class="elms-sans text-2xl" :class="currentTheme.colors.text4"> You played on {{ prop.mode }} mode. </h2>
        <div class="w-[90%] mx-[5%] h-[80%] rounded-2xl p-[2%] flex flex-col justify-around"
            :class="currentTheme.colors.bg2">
            <div>
                <h2 class="text-xl text-center elms-sans" :class="currentTheme.colors.text2"> Your Scores: {{ scoresString }} </h2>
                <h2 class="text-xl text-center elms-sans" :class="currentTheme.colors.text2" v-if="prop.mode==='simple'"> Early Calls: {{ earlyCalls }} </h2>
                <h2 class="text-xl text-center elms-sans" :class="currentTheme.colors.text2"> Final Reaction Time Average: {{ average }} ms  </h2>
                <h2 class="text-4xl elms-sans text-center mt-[2%]" :class="currentTheme.colors.text1"> That's as fast as a <span :class="currentTheme.colors.text3">{{getRank()}}</span>!</h2>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const prop = defineProps<{
    mode:string,
    reactionTimes:number[]
    earlyCalls: number
}>()

let scoresString = ref<string>('')

let themeStore = useThemeStore()
let currentTheme = computed(() => themeStore.getActiveTheme())
let total = ref<number>(0)
let average = ref<number>(0)

const modeAdjuster = computed(() => { if(prop.mode ==='sniper') return -300; else return 0})

// create scoresString
prop.reactionTimes.forEach((time:number, index) => {
    scoresString.value += time
    total.value += time

    if(index + 1 === prop.reactionTimes.length) scoresString.value += 'ms'
    else scoresString.value += ' ms, '
})
average.value = Number((total.value / prop.reactionTimes.length).toFixed(0))

function getRank() {
    if(average.value + modeAdjuster.value > 1000) return 'sloth'
    else if (average.value + modeAdjuster.value > 500) return 'goldfish'
    else if (average.value + modeAdjuster.value > 350) return 'lion'
    else if (average.value + modeAdjuster.value > 250) return 'cheetah'
    else if (average.value + modeAdjuster.value > 150) return 'cat'
    else return 'woodpecker'
}

</script>

<style scoped>

</style>