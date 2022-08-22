import axios from 'axios'

/**
 * Fetches the initial participant list from the server.
 *
 * @returns Array A list of participants with all information required for the frontend.
 */
export const fetchParticipantList = async () => {
    const serverUrl = process.env.REST_SERVER_URL
    const response = await axios.get(serverUrl + '/participants')
    return response.data
}
