import {expect, test} from "vitest"
import {render} from "@testing-library/react"
import App from "../App.tsx"
import userEvent from "@testing-library/user-event"

test('My App works as expected', async () => {
    const user = userEvent.setup()
    const app = render(<App/>)
    const textAreaFrom = app.getByPlaceholderText('Enter Text')

    await user.type(textAreaFrom, 'Hola Mundo')
    const result = await app.findByDisplayValue(/Hello world/i, {}, {timeout: 2000})
    expect(result).toBeTruthy()
})
