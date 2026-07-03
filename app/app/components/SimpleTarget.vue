<template>
    <div class="w-[90%] mx-[5%] h-[50%] border-2 bg-red-500/70 hover:bg-red-500 transition-all ease-in-out duration-200 rounded-2xl p-[1%] flex justify-center items-center"
        :class="currentTheme.colors.basicDiv[1]" v-if="!targetReady && !clickedInvalid && !clickedValid" @click="clickedInvalid = true">
        <h3 class="text-4xl text-center text-black elms-sans">WAITING<span v-for="i in numberOfElipses">.</span></h3>
    </div>
    <div class="w-[90%] mx-[5%] h-[50%] border-2 bg-emerald-500/70 hover:bg-emerald-500 transition-all ease-in-out duration-200 rounded-2xl p-[1%] flex justify-center items-center"
        :class="currentTheme.colors.basicDiv[1]" v-else-if="targetReady" @click="receiveValidClick()">
        <h3 class="text-4xl text-center text-black elms-sans">CLICK NOW!</h3>
    </div>
    <div class="w-[90%] mx-[5%] h-[50%] border-2 transition-all ease-in-out duration-200 rounded-2xl p-[1%] flex flex-col justify-around items-center text-xl elms-sans"
        :class="[currentTheme.colors.bg2, currentTheme.colors.text2]" v-if="clickedInvalid">
        You clicked too fast!
        <button class="w-[90%] mx-[5%] border-2 rounded-full transition-all duration-300 ease-in-out
        hover:translate-y-[-5%] active:translate-y-[5%] py-[1%] elms-sans text-2x"
            :class="[currentTheme.colors.bg4, currentTheme.colors.button1]"
            @click="$emit('testFinish', reactionScore)">GO TO NEXT TEST / FINISH</button>
    </div>
    <div class="w-[90%] mx-[5%] h-[50%] border-2 transition-all ease-in-out duration-200 rounded-2xl p-[1%] flex flex-col justify-around items-center elms-sans text-xl"
        :class="[currentTheme.colors.bg2, currentTheme.colors.text2]" v-if="clickedValid">
        Your score: {{ reactionScore }}ms
        <button class="w-[90%] mx-[5%] border-2 rounded-full transition-all duration-300 ease-in-out
        hover:translate-y-[-5%] active:translate-y-[5%] py-[1%] elms-sans text-2x"
            :class="[currentTheme.colors.bg4, currentTheme.colors.button1]"
            @click="{clickedValid = false; $emit('testFinish', reactionScore)}">GO TO NEXT TEST / FINISH</button>
    </div>
</template>

<script setup lang="ts">
let themeStore = useThemeStore()
let currentTheme = computed(() => themeStore.getActiveTheme())
let targetReady = ref<boolean>(false)
let clickedInvalid = ref<boolean>(false)
let clickedValid = ref<boolean>(false)

const startTimestamp = ref<number>(0)
const endTimestamp = ref<number>(0)
const emit = defineEmits(['testFinish'])

let reactionScore = ref<number>(2000)

let numberOfElipses = ref<number>(0)

const elipsesChange = setInterval(() => {
    numberOfElipses.value++
    if (numberOfElipses.value > 3) numberOfElipses.value = 1
}, 500)

onMounted(() => {
    const readyTarget = setTimeout(() => {
        if(!clickedInvalid.value) targetReady.value = true
        startTimestamp.value = Date.now()
    }, Math.floor((Math.random() * 2000) + 5000))
})

function receiveValidClick() {
    endTimestamp.value = Date.now()
    clickedValid.value = true
    targetReady.value = false
    reactionScore.value = endTimestamp.value - startTimestamp.value
}

</script>

<style scoped></style>