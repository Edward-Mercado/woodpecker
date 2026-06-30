<template>
  <div class="h-screen">
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>

<script lang="ts">
[
            {
                name: 'light',
                colors: {
                    bg1: 'bg-orange-50',
                    bg2: 'bg-orange-200',
                    bg3: 'bg-taupe-800',
                    text1: 'text-stone-950',
                    text2: 'text-taupe-900',
                    text3: 'text-taupe-800',
                    text4: 'text-white',
                    dynamicText1: ['text-stone-950', 'hover:text-amber-700', 'hover:underline'],
                    dynamicText2: [],
                    accent1: 'bg-orange-400',
                    button1: 'bg-amber-200',
                    button2: 'bg-amber-950'
                }
            },
            {
                name: 'dark',
                colors: {
                    bg1: 'bg-slate-950',
                    bg2: 'bg-slate-900',
                    bg3: 'bg-sky-50',
                    text1: 'text-sky-50',
                    text2: 'text-slate-200',
                    text3: 'text-slate-400',
                    text4: 'text-slate-950',
                    dynamicText1: ['text-sky-100', 'hover:text-sky-200', 'active:text-sky-400'],
                    dynamicText2: [],
                    accent1: 'bg-blue-500',
                    button1: 'bg-sky-400',
                    button2: 'bg-slate-800'
                }
            }
        ]
</script>
