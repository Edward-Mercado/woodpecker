export interface themeColors {
bg1: string,
bg2: string,
bg3: string,
text1: string
text2: string,
text3: string,
text4: string,
dynamicText1: string[],
dynamicText2: string[],
activeRoute: string[],
accent1: string,
button1: string,
button2: string,
}

export interface themeObject {
    name: string,
    colors: themeColors
}

export interface landingRouteType {
    '/': string[] | null,
    '/typing-speed': string[] | null,
    '/click-speed': string[] | null,
    '/reaction-speed': string[] | null,
}