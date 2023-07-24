import {Form} from "react-bootstrap"
import {SectionType} from "../../types.d"

interface Props {
    type: SectionType
    loading?: boolean
    value: string
    onChange: (value: string) => void
}

const commonStyles = {border: 0, height: '200px'}
const getPlaceHolder = ({type, loading}: { type: SectionType, loading?: boolean }) => {
    if (type === SectionType.From) return 'Enter Text'
    if (loading === true) return 'Loading ...'
    return 'Translation'
}

export const TextArea = ({type, loading, value, onChange}: Props) => {
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    }

    const styles = type === SectionType.From ? commonStyles : {...commonStyles, backgroundColor: '#f5f5f5'}
    return (
        <Form.Control
            as='textarea'
            placeholder={getPlaceHolder({type, loading})}
            autoFocus={type === SectionType.From}
            disabled={type === SectionType.To}
            style={styles} value={value} onChange={handleChange}
        />
    )
}
