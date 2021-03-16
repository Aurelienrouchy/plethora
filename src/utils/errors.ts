import { displayError, setError } from "../provider/errors/errors.actions"

export const showError = (text: string) => {
    displayError(true)
    setError(text)
    setTimeout(() => displayError(false), 3000)
}