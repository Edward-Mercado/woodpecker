<template>
    <div class="mt-[2%] p-[1%] rounded-2xl px-[2%] border-2" :class="currentTheme.colors.basicDiv">
        <div class="flex w-full justify-between">
            <div class="flex items-center">
                <input type="text" inputmode="numeric" maxlength="5" class="min-w-[15%] w-20 rounded-2xl px-[2%] elms-sans focus:outline-none text-center" :class="[currentTheme.colors.bg2, currentTheme.colors.text2]" placeholder="####" v-model="timeInput"> 
                <p class="elms-sans ml-3" :class="currentTheme.colors.text4"> clicks</p>
            </div>
            <button :class="currentTheme.colors.button1" class="border-2 px-[1%] rounded-2xl transition-all duration-300 hover:translate-y-[-5%] active:translate-y-[5%] elms-sans w-[10%]"
            v-for="number in ['10', '50', '100', '200']"
            @click="timeInput = number"
            >{{ number }}</button>
            <button :class="currentTheme.colors.button1" class="border-2 px-[1%] rounded-2xl transition-all duration-300 hover:translate-y-[-5%] active:translate-y-[5%] elms-sans"
            @click="createTest()"
            >Create Test</button>
        </div>
        <div v-if="error" class="mt-[1%] text-md elms-sans italic">
            # That's not a valid amount of clicks. Try again please!
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
    let clicks = Number(timeInput.value)
    if(!(clicks > 0)) {
        error.value = true
    } else emit('createTest', Math.floor(clicks))
}

watch(() => timeInput.value, () => error.value = false)
</script>

<style scoped>

</style>