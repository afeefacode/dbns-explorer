import axios from 'axios'
// import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config()

export const fetchEntities = async (type) => {
  const serverUrl = 'http://localhost:6002/'
  // const serverUrl = process.env.REST_SERVER_URL
  const response = await axios.get(serverUrl + type)
  return response.data
}
