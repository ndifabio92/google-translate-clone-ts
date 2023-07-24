import {Button, Col, Row, Stack} from "react-bootstrap"
import {LanguageSelector} from "../../components/ui/LanguageSelector.tsx"
import {SectionType} from "../../types.d"
import {TextArea} from "../../components/ui/TextArea.tsx"
import {AUTO_LANGUAGE} from "../../constants/languages.ts"
import {ArrowsIcon} from "../../components/ui/Icons.tsx"
import {useStore} from "../../hooks/useStore.ts"
import {useEffect} from "react"
import {translate} from "../../services/translate.ts"
import {useDebounce} from "../../hooks/useDebounce.ts"
import TextAreaAction from "../../components/TextAreaAction.tsx";

const Home = () => {
    const {
        loading,
        fromLanguage,
        toLanguage,
        fromText,
        result,
        setFromLanguage,
        interchangeLanguages,
        setToLanguage,
        setFromText,
        setResult
    } = useStore()

    const debousedFromText = useDebounce(fromText, 300)

    useEffect(() => {
        if (fromText === '') return
        translate({fromLanguage, toLanguage, text: debousedFromText})
            .then(result => {
                if (result == null) return
                setResult(result)
            })
            .catch(() => {
                setResult('Error')
            })
    }, [debousedFromText, fromLanguage, toLanguage])

    return (
        <Row>
            <Col>
                <Stack gap={2}>
                    <LanguageSelector onChange={setFromLanguage} type={SectionType.From} value={fromLanguage}/>
                    <TextArea type={SectionType.From} value={fromText} onChange={setFromText} loading={loading}/>
                </Stack>
            </Col>
            <Col xs='auto'>
                <Button variant="link" disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
                    <ArrowsIcon/>
                </Button>
            </Col>
            <Col>
                <Stack gap={2}>
                    <LanguageSelector onChange={setToLanguage} type={SectionType.To} value={toLanguage}/>
                    <div style={{position: 'relative'}}>
                        <TextArea type={SectionType.To} value={result} onChange={setResult} loading={loading}/>
                        <TextAreaAction result={result} toLanguage={toLanguage}/>
                    </div>
                </Stack>
            </Col>
        </Row>
    )
}

export default Home
