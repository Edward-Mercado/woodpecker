export const typeTestScore = defineStore('typeTest', {
    state: () => ({
        activeMode: '' as string,
        language: '' as string,
        wordCount: 0 as number,
        testTime: 0 as number,
        useNumbers: false as boolean,
        usePunctuation: false as boolean,
        capitalizeWords: false as boolean,
        showAuthor: false as boolean,
        author: '' as string,
        quoteContent: '' as string,
        wordsContent: [] as string[],
        langCodes: {
            'English': 'en',
            'Spanish': 'es',
            'Italian': 'it',
            'German': 'de',
            'French': 'fr',
            'Portuguese': 'pt-br',
            'Romanian': 'ro'
        }
    }),
    actions: {
        resetState() {
            this.activeMode = ''
            this.language = ''
            this.wordCount = 0
            this.testTime = 0
            this.useNumbers = false
            this.usePunctuation = false
            this.capitalizeWords = false
            this.showAuthor = false
            this.author = ''
            this.quoteContent = ''
            this.wordsContent = []
        },
        setTestTime(min: number, sec: number) {
            this.testTime = 0
            this.testTime += (min * 60000) + (sec * 1000)
        },
        async populateQuote() {
            await fetch('https://thequoteshub.com/api/random-quote')
                .then(async (response) => {
                    let quoteJSON = await response.json()

                    this.quoteContent = quoteJSON.text
                    this.author = quoteJSON.author
                })
        },
        async getWords() {
            if (this.activeMode === 'timed') {
                this.wordCount = (this.testTime / 1000) * 5
            } 
            // @ts-ignore
            let quote = await fetch(`https://random-word-api.herokuapp.com/word?number=${this.wordCount}&lang=${this.langCodes[this.language]}`)
                .then(async (response) => {
                    let wordsJSON = await response.json()
                    this.wordsContent = wordsJSON
                })  
        },
    }
})