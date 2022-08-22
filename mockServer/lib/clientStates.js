import { isLetter } from './string'

export const faceStringToInt = (face) => {
    switch (face) {
        case 'neutral':
            return 1
        case 'happy':
            return 2
        case 'sad':
            return 3
        case 'away':
            return 4
        case undefined:
        default:
            return 0
    }
}

export const faceIntToString = (face) => {
    switch (face) {
        case 1:
            return 'neutral'
        case 2:
            return 'happy'
        case 3:
            return 'sad'
        case 4:
            return 'away'
        case undefined:
        default:
            return 'neutral'
    }
}

export const participantToCsJson = (participant) => {
    const { id, face, lastUpdated } = participant
    return {
        i: id,
        f: faceStringToInt(face),
        t: lastUpdated,
    }
}

export const csJsonToCsString = (csJson) => {
    let string = ''
    Object.keys(csJson).forEach((key) => {
        string += `${ key }${ csJson[key] }`
    })
    return '$' + string
}

export const participantToCsString = (participant) => {
    const csJson = participantToCsJson(participant)
    return csJsonToCsString(csJson)
}

export const splitCsListString = (csListString) => {
    const csListStringArray = csListString.trim().split('$')
    csListStringArray.splice(0, 1)
    return csListStringArray
}

export const csStringToCsJson = (csString) => {
    let csJson = {}
    let currentKey
    let currentValue = ''

    for (let i = 0; i < csString.length; i++) {
        const currentChar = csString.charAt(i)
        if (isLetter(currentChar)) {
            currentValue = ''
            currentKey = currentChar
            csJson[currentKey] = null
        } else {
            currentValue += currentChar
            csJson[currentKey] = parseInt(currentValue)
        }
    }
    return csJson
}

