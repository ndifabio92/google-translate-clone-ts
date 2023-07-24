import {ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi} from "openai"
import {type FromLanguage, type Language} from "../types"
import {SUPPORTED_LANGUAGES} from "../constants/languages.ts"

const apiKey = import.meta.env.VITE_APP_OPENAI_API_KEY

const configuration = new Configuration({apiKey})
const openai = new OpenAIApi(configuration)

export const translate = async ({fromLanguage, toLanguage, text}: {
    fromLanguage: FromLanguage
    toLanguage: Language
    text: string
}) => {
    if (fromLanguage === toLanguage) return text
    const messages = [
        {
            role: ChatCompletionRequestMessageRoleEnum.System,
            content: "You are a AI that translates text. You receive a text from the user. Do not answer, just translate the text. The original language is surrounded by `{{` and `}}`. You can also recive {{auto}} which means that you have to detect the language. The language you translate to is surrounded by `[[` and `]]`."
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: "Hola mundo {{Español}} [[English]]"
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content: "Hello world"
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: "How are you? {{auto}} [[Deutsch]]"
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content: "Wie geht es dir?"
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: "Bon dia, com estas? {{auto}} [[Español]]"
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content: "Buenos dias, como estas?"
        }
    ]

    const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
    const toCode = SUPPORTED_LANGUAGES[toLanguage]

    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            ...messages,
            {
                role: ChatCompletionRequestMessageRoleEnum.User,
                content: `${text} {{${fromCode}} [[${toCode}]]`
            }
        ]
    }, {
        headers: {
            'User-Agent': 'google-translate-clone'
        }
    })
    return completion.data.choices[0]?.message?.content
}
