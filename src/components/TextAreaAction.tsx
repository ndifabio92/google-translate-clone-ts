import {Button} from "react-bootstrap"
import {ClipboardIcon, SpeakerIcon} from "./ui/Icons.tsx"
import {type Language} from "../types"

interface Props {
    result: string
    toLanguage: Language
}

const TextAreaAction = ({result, toLanguage}: Props) => {
    const handleClipboard = () => {
        navigator.clipboard.writeText(result).catch(() => {
        })
    }

    const handleSpeak = () => {
        const utterance = new SpeechSynthesisUtterance(result)
        utterance.lang = toLanguage
        speechSynthesis.speak(utterance)
    }
    return (
        <div style={{position: "absolute", left: 0, bottom: 0, display: "flex"}}>
            <Button variant="link" onClick={handleClipboard}>
                <ClipboardIcon/>
            </Button>
            <Button variant="link" onClick={handleSpeak}>
                <SpeakerIcon/>
            </Button>
        </div>
    )
}

export default TextAreaAction
