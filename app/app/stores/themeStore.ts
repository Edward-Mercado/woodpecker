export const useThemeStore = defineStore('theme', {
    state: () => ({
        activeThemeName: 'light' as string,
        currentRoute: '/' as string,
        landingRoutes: {
            '/': null,
            '/typing-speed': null,
            '/click-speed': null,
            '/reaction-speed': null,
        } as landingRouteType,
        activeTheme: null as (null | themeObject),
        themes: [
            {
                name: 'light',
                colors: {
                    bg1: 'bg-orange-50',
                    bg2: 'bg-orange-200',
                    bg3: 'bg-orange-400/40',
                    bg4: 'bg-neutral-800',
                    text1: 'text-stone-950',
                    text2: 'text-stone-900',
                    text3: 'text-orange-800',
                    text4: 'text-white',
                    text5: 'text-orange-100',
                    dynamicText1: ['text-stone-950', 'hover:text-amber-700', 'hover:underline'],
                    dynamicText2: [],
                    themePath: ['/images/moon.png', 'border-stone-950', 'hover:border-orange-800', 'hover:bg-orange-300/30', 'transition-all', 'ease-in-out', 'duration-300'],
                    activeRoute: ['border-b-3', 'border-solid', 'border-stone-950'],
                    accent1: 'bg-orange-400',
                    button1: ['text-orange-50', 'hover:bg-orange-50', 'hover:text-stone-800', 'border-stone-800', 'active:bg-orange-200'],
                    button2: ['bg-amber-950'],
                    button1Active: 'bg-neutral-950',
                    button1Unactive: 'bg-neutral-950/20',
                    button2Active: 'bg-neutral-500',
                    divider: 'bg-stone-900',
                    basicDiv: ['bg-neutral-800/60', 'border-stone-900'],
                    clickTesterDiv: ['bg-orange-200', 'text-stone-900'],
                    rangeSlider: ['bg-neutral-400', 'border-neutral-900', 'border-2'],
                    selection: 'selection:bg-amber-500/40',
                    sniperTarget: ['bg-orange-50', 'hover:bg-amber-100', 'hover:border-amber-300'],
                }
            },
            {
                name: 'dark',
                colors: {
                    bg1: 'bg-slate-950',
                    bg2: 'bg-slate-900',
                    bg3: 'bg-slate-800',
                    bg4: 'bg-sky-200',
                    text1: 'text-sky-50',
                    text2: 'text-sky-200',
                    text3: 'text-cyan-200',
                    text4: 'text-slate-950',
                    text5: 'text-slate-800',
                    dynamicText1: ['text-sky-100', 'hover:text-sky-200', 'hover:underline'],
                    dynamicText2: [],
                    activeRoute: ['border-b-3', 'border-solid', 'border-sky-100'],
                    themePath: ['/images/sun.png', 'border-sky-100', 'hover:border-sky-200', 'hover:bg-slate-600/80', 'transition-all', 'ease-in-out', 'duration-300'],
                    accent1: 'bg-blue-500',
                    button1: ['text-slate-950', 'hover:bg-slate-950', 'hover:text-sky-50', 'border-sky-400', 'active:bg-slate-800'],
                    button1Active: 'bg-sky-100',
                    button1Unactive: 'bg-sky-100/20',
                    button2Active: 'bg-sky-400',
                    button2: ['bg-sky-900'],
                    divider: 'bg-sky-200',
                    basicDiv: ['bg-sky-200/80', 'border-sky-400'],
                    clickTesterDiv: ['bg-slate-900', 'text-sky-200', 'hover:bg-slate-800', 'active:bg-sky-800'],
                    rangeSlider: ['bg-slate-900', 'border-slate-700', 'border-2'],
                    selection: 'selection:bg-emerald-50/40',
                    sniperTarget: ['bg-slate-900', 'hover:bg-slate-800', 'hover-border-sky-800'],
                }
            }
        ] as themeObject[]
    }),
    actions: {
        getActiveTheme() {
            let foundTheme:(themeObject | undefined) = this.themes.find((theme) => theme.name === this.activeThemeName)
            if(!foundTheme) foundTheme = this.themes[0] as themeObject
            this.activeTheme = foundTheme
            return foundTheme
        },
        changeTheme() {
            if(this.activeThemeName === 'light') this.activeThemeName = 'dark'
            else this.activeThemeName = 'light'
            localStorage.setItem('themeName', this.activeThemeName)
            this.getActiveTheme()
        }
    }
})