import axios from "axios";

// @todo: all api requests can probably be abstracted to one request with changing bodies

export const fetchCategoryList = async (requestBody: object) => {
  const serverUrl = 'https://daten.nachhaltiges-sachsen.de/api/v2'
  const response = await axios.post(serverUrl, requestBody)
  return response.data
}

