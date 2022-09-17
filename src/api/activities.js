import axios from 'axios'
// import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config()

/**
 * Fetches the initial participant list from the server.
 *
 * @returns Array A list of participants with all information required for the frontend.
 */
export const fetchActivities = async () => {
  const serverUrl = 'http://localhost:6002'
  // const serverUrl = process.env.REST_SERVER_URL
  const response = await axios.get(serverUrl + '/activities')
  return response.data
}
