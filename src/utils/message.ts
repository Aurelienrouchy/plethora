import { displayMessage, setText } from "../provider/messages/messages.actions"

export const showMessage = (text: string, backgroundColor?: string) => {
    displayMessage(true)
    setText(text)
    setTimeout(() => displayMessage(false), 3000)
}