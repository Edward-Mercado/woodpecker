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
                    bg3: 'bg-taupe-800',
                    text1: 'text-stone-950',
                    text2: 'text-taupe-900',
                    text3: 'text-taupe-800',
                    text4: 'text-white',
                    dynamicText1: ['text-stone-950', 'hover:text-amber-700', 'hover:underline'],
                    dynamicText2: [],
                    themePath: ['/images/moon.png', 'border-stone-950', 'hover:border-orange-800', 'hover:bg-orange-300/30', 'transition-all', 'ease-in-out', 'duration-300'],
                    activeRoute: ['border-b-3', 'border-solid', 'border-stone-950'],
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
                    dynamicText1: ['text-sky-100', 'hover:text-sky-200', 'hover:underline'],
                    dynamicText2: [],
                    activeRoute: ['border-b-3', 'border-solid', 'border-sky-100'],
                    themePath: ['/images/sun.png', 'border-sky-100', 'hover:border-sky-200', 'hover:bg-slate-600/80', 'transition-all', 'ease-in-out', 'duration-300'],
                    accent1: 'bg-blue-500',
                    button1: 'bg-sky-400',
                    button2: 'bg-slate-800'
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