import axios from 'axios'
// import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config()

export const fetchActorListApiV2 = async () => {
  const serverUrl = 'https://daten.nachhaltiges-sachsen.de/api/v2'
  const body = {
    "resource": "NLS.ActorResource",
    "action": "list",
    "fields": {
      "title": true,
      "description": true,
      "slug": true
    }
  }
  // const serverUrl = process.env.REST_SERVER_URL
  const response = await axios.post(serverUrl, body)
  return response.data
}

export const fetchActorList = async () => {
  const serverUrl = 'http://localhost:6002/actors'
  // const serverUrl = process.env.REST_SERVER_URL
  const response = await axios.get(serverUrl)
  return response.data
}

export const fetchActorDetails = async (id) => {
  const serverUrl = 'http://localhost:6002/'
  // const serverUrl = process.env.REST_SERVER_URL
  const response = await axios.get(serverUrl + type + "/" + id)
  return response.data
}
