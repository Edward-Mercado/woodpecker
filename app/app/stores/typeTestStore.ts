export const useTypeTestStore = defineStore('typeTest', {
    state: () => ({
        showTest: false as boolean,
        activeMode: '' as string,
        language: '' as string,
        wordCount: 0 as number,
        testTime: 0 as number,
        useNumbers: false as boolean,
        usePunctuation: false as boolean,
        capitalizeWords: false as boolean,
        allLowercase: false as boolean,
        showAuthor: false as boolean,
        author: '' as string,
        quoteContent: '' as string,
        completedWordsContent: [] as string[],
        wordsContent: [] as string[],
        approachingWordsContent: [] as string[],
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
            this.showTest = false
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
            this.completedWordsContent = []
            this.wordsContent = []
            this.approachingWordsContent = []
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
        async createTest(mode:string, args:(boolean | number | string)[]) {
            if(mode==='quote') {
                this.allLowercase = (args[0] as boolean)
                this.usePunctuation = (args[1] as boolean)
                this.showAuthor = (args[2] as boolean)

                await this.populateQuote()
                this.applyQuoteModes()
            } else if (mode === 'timed') {
                this.setTestTime(Number(args[0]), Number(args[1]))
                this.language = args[2] as string

                this.useNumbers = (args[3] as boolean)
                this.usePunctuation = (args[4] as boolean)
                this.capitalizeWords = (args[5] as boolean)

                await this.getWords()
            } else if (mode === 'words') {
                this.wordCount = Number(args[0])
                this.language = (args[1] as string)

                this.useNumbers = (args[2] as boolean)
                this.usePunctuation = (args[3] as boolean)
                this.capitalizeWords = (args[4] as boolean)

                await this.getWords()
            }
            this.showTest = true
        },
        
        applyQuoteModes() {
            if(this.allLowercase) this.quoteContent = this.quoteContent.toLowerCase()
            if(!this.usePunctuation) this.quoteContent = this.quoteContent.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’]/g, "")
        }
    }
})