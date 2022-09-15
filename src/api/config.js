import axios from 'axios'

/**
 * Fetches the app config from the server.
 *
 * @returns Object
 */
export const fetchConfig = async () => {
  const serverUrl = 'http://localhost:6002'
  const host = (new URL(window.location.href)).searchParams.get('host')
  const response = await axios.get(serverUrl + '/configs/' + host)
  return response.data
}
