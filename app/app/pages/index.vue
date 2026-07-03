<template>
    <div class="min-h-screen">
        <div class="px-[2%] py-[4%]" :class="[currentTheme.colors.bg1]">
            <h2 class="text-4xl elms-sans" :class="currentTheme.colors.text1"> What is Woodpecker? </h2>
            <p class="elms-sans text-lg mt-[2%]" :class="currentTheme.colors.text3"> Woodpecker is a personal project
                created by Edward Mercado.
                It really explores his philosophy of making awful designs, and postulates the question, "What if he could do
                better?"
                Well, humble viewer, that's why I made this website, to explore all of that. Perhaps I can aim
                to make simpler CSS, as <span class="italic" :class="currentTheme.colors.text1"> less is more </span>
                after all. This is just a simple site with some simple tests, displayed 
                in a prettier way than some of the random websites you can find. It's named after a woodpecker because I thought the name was cute,
                and they click and clack a lot.
            </p>
        </div>
        <div class="min-h-[2%] w-full" :class="currentTheme.colors.divider"><h2 class="text-[0.1rem]" :class="currentTheme.colors.text2">.</h2></div>
        <div class="px-[2%] min-h-[88%] pb-[0.5%] pt-[4%]" :class="[currentTheme.colors.bg3]">
            <h2 class="text-4xl elms-sans" :class="currentTheme.colors.text1"> The Types of Tests </h2>
            <p class="elms-sans text-lg mt-[2%]" :class="currentTheme.colors.text3"> I mean, what tests am I even referring to? Let's find out.</p>
            <div class="w-full flex flex-col items-center justify-around my-[4%] gap-4">
                <div class="border-2 rounded-2xl w-full p-[2%]" :class="currentTheme.colors.basicDiv" data-aos="fade-right">
                    <h3 class="elms-sans text-xl" :class="currentTheme.colors.text4"> Typing Speed Test </h3>
                    <p class="elms-sans text-lg mt-[2%]" :class="currentTheme.colors.text5"> There's a few variants of the typing test, most of them ripped directly from monkeytype. 
                        I mean, I also am taking the minimalist design philosophy from them too. <a href="https://monkeytype.com" :class="currentTheme.colors.text4" class="italic underline">monkeytype.com</a> 
                        is just a very nice looking website. </p>
                    <p class="elms-sans text-lg mt-[2%]" :class="currentTheme.colors.text5"> The first type of typing test is the timed mode. You can set a custom amount of time, 
                        and then see how many words you can get done in that time! Scale that up, and you can get your words per minute!</p>
                    <p class="elms-sans text-lg mt-[2%]" :class="currentTheme.colors.text5"> The second type is the words mode. Set the amount of words you want to type out, and get timed based on 
                        how long it takes you to complete them!</p>
                </div>
                <div class="border-2 rounded-2xl w-full p-[2%]" :class="currentTheme.colors.basicDiv" data-aos="fade-right">
                    <h3 class="elms-sans text-xl" :class="currentTheme.colors.text4"> Clicking Speed Test </h3>
                    <p class="elms-sans text-lg mt-[2%]" :class="currentTheme.colors.text5"> There's two variants of this too!  </p>
                    <p class="elms-sans text-lg mt-[2%]" :class="currentTheme.colors.text5"> The first type of typing test is the timed mode. Set the amount of time, and then click away!</p>
                    <p class="elms-sans text-lg mt-[2%]" :class="currentTheme.colors.text5"> The second type is the clicks mode! How fast does it take you to get the amount of clicks you want? </p>
                </div>
                <div class="border-2 rounded-2xl w-full p-[2%]" :class="currentTheme.colors.basicDiv" data-aos="fade-right">
                    <h3 class="elms-sans text-xl" :class="currentTheme.colors.text4"> Reaction Speed Test </h3>
                    <p class="elms-sans text-lg mt-[2%]" :class="currentTheme.colors.text5"> How fast can you react? There's... also two variants of this...  </p>
                    <p class="elms-sans text-lg mt-[2%]" :class="currentTheme.colors.text5"> The first is simple mode. As soon as the light turns green, click! </p>
                    <p class="elms-sans text-lg mt-[2%]" :class="currentTheme.colors.text5"> The second is sniper mode. Not the entire light will turn green, just a small target. Click it fast! </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Woodpecker'
})

let themeStore = useThemeStore()
let currentTheme = computed(() => themeStore.getActiveTheme())
</script>

<style scoped></style>