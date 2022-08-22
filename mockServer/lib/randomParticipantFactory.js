
const getRandomArrayElement = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}

const getRandomParticipant = (i) => {
    const firstNamesFemale = [ 'Ute', 'Mara', 'Sybille', 'Esther', 'Rebecca' ]
    const firstNamesMale = [ 'David', 'Erhardt', 'Mathias', 'Yannik', 'Thomas' ]
    const lastNames = [
        'Lemberger',
        'Krantz',
        'Hirsch',
        'Beitz',
        'Meckler',
        'Hönig',
        'Richter',
        'Meier',
        'Müller',
    ]

    const states = [
        'connected',
        'connected',
        'connected',
        'connected',
        'connected',
        'connected',
        'connected',
        'connected',
        'connected',
        'connected',
        'connected',
        'connected',
        'offline',
    ]

    const faces = [
        'neutral',
        'neutral',
        'neutral',
        'neutral',
        'neutral',
        'happy',
        'sad',
        'away',
    ]

    const id = i
    const gender = Math.floor(Math.random() * 2) ? 'male' : 'female'
    const firstName =
        gender === 'male'
            ? getRandomArrayElement(firstNamesMale)
            : getRandomArrayElement(firstNamesFemale)
    const lastName = getRandomArrayElement(lastNames)
    const state = getRandomArrayElement(states)
    const face =
        state === 'offline' ? undefined : getRandomArrayElement(faces)

    return {
        id,
        gender,
        firstName,
        lastName,
        state,
        face,
    }
}

export const getRandomParticipantList = (n) => {
    let randomParticipants = []
    for (let i = 1; i < n + 1; i++) {
        randomParticipants.push(getRandomParticipant(i))
    }
    return randomParticipants
}

