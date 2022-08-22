export const isLetter = (character) => {
    const regex = /^[a-z]+$/
    if (character.match(regex)) {
        return true
    } else {
        return false
    }
}