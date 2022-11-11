import axios from "axios";

export const fetchEntityList = async (requestBody: object) => {
  const serverUrl = 'https://daten.nachhaltiges-sachsen.de/api/v2'
  const response = await axios.post(serverUrl, requestBody)
  return response.data
}

export const fetchEntityDetails = async (requestBody: object) => {
  const serverUrl = 'https://daten.nachhaltiges-sachsen.de/api/v2'
  const response = await axios.post(serverUrl, requestBody)
  return response.data
}

