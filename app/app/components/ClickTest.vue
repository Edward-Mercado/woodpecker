<template>
    <div data-aos="fade-up" class="mt-[4%] border-2 rounded-2xl p-[2%] justify-around items-center flex flex-col px-auto h-[45vh] w-[96%] mx-[2%]"
        :class="currentTheme.colors.basicDiv">
        <h2 class="elms-sans text-center text-xl" :class="currentTheme.colors.text4"> Click the box below to start.
        </h2>
        <div v-if="mode === 'timed'" class="flex flex-col justify-between items-center h-[90%] w-full">
            <div class="h-[20%]">
                <h3 class="elms-sans text-center text-md" :class="currentTheme.colors.text4"> You have {{
                    timed.remainingTime.toFixed(1) }} seconds left! You have clicked {{ timed.currentClicks !== 1 ?
                        timed.currentClicks : 0 }} times. </h3>
                <h3 class="elms-sans text-center text-md h-[10%]" :class="currentTheme.colors.text4"> Current CPS: {{
                    timed.currentCPS }} </h3>
            </div>
            <div class="w-[90%] h-[90%] flex items-center justify-center border-2 rounded-2xl text-4xl elms-sans duration-100 hover:translate-y-[-.5%] active:translate-y-[.5%]"
                :class="currentTheme.colors.clickTesterDiv" @click="receiveTimedClick()">
                {{ !started ? "START CLICKING!" : null }}
            </div>
        </div>
        <div v-else-if="mode === 'click'" class="flex flex-col justify-between items-center h-[90%] w-full">
            <div class="h-[20%]">
                <h3 class="elms-sans text-center text-md" :class="currentTheme.colors.text4"> You have {{
                    click.remainingClicks }} clicks left! </h3>
            </div>
            <div class="w-[90%] h-[90%] flex items-center justify-center border-2 rounded-2xl text-4xl elms-sans duration-100 hover:translate-y-[-.5%] active:translate-y-[.5%]"
                :class="currentTheme.colors.clickTesterDiv"
                @click="receiveCountClick()">
                {{ !started ? "START CLICKING!" : null }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const emit=defineEmits(['clickEnd', 'timedEnd'])

let themeStore = useThemeStore()
let currentTheme = computed(() => themeStore.getActiveTheme())
const started = ref<boolean>(false)
const ended = ref<boolean>(false)

const prop = defineProps<{
    testQuantity: number,
    mode: ('none' | 'timed' | 'click')
}>()

const timed = reactive({
    totalTime: 0,
    remainingTime: 0,
    currentClicks: 1,
    currentCPS: 0
})

if (prop.mode === 'timed') {
    timed.totalTime = prop.testQuantity
    timed.remainingTime = prop.testQuantity
}

const click = reactive({
    totalClicks: 0,
    remainingClicks: 0
})

if (prop.mode === 'click') {
    click.totalClicks = prop.testQuantity
    click.remainingClicks = prop.testQuantity
}

function receiveTimedClick() {
    if (!started.value) {
        started.value = true
        const clickInterval = setInterval(() => {
            timed.remainingTime -= .1
            timed.currentCPS = parseFloat((timed.currentClicks / (timed.totalTime - timed.remainingTime)).toFixed(1))
            if (timed.remainingTime < 0.1) {
                ended.value = true
                timed.remainingTime = 0
                emit('timedEnd', timed.currentClicks, timed.totalTime, timed.currentCPS)
                
                clearTimeout(clickInterval)
            }
        }, 100)
    } else {
        if (!ended.value) {
            timed.currentClicks++
        }
    }
}

const startTime = ref<number>(0)
const endTime = ref<number>(0)

function receiveCountClick() {
    if (!started.value) {
        started.value = true
        startTime.value = Date.now()
    } else {
        if (!ended.value) { 
            if(click.remainingClicks < 1) {
                endTime.value = Date.now();
                const time = parseFloat(((endTime.value - startTime.value)/1000).toFixed(1))
                const cps = (click.totalClicks / time).toFixed(1)
                emit("clickEnd", click.totalClicks, time, cps)
            } else click.remainingClicks--
        }
    }
}

</script>

<style scoped></style>