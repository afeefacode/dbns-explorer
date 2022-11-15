import axios from 'axios'

export const fetchEventList = async () => {
  const serverUrl = 'https://daten.nachhaltiges-sachsen.de/api/v2'
  const body = {
    "resource": "NLS.EventResource",
    "action": "list",
    "fields": {
      "title": true,
      "description": true,
      "slug": true
    }
  }
  const response = await axios.post(serverUrl, body)
  return response.data
}

export const fetchEventDetails = async (id) => {
  const serverUrl = 'https://daten.nachhaltiges-sachsen.de/api/v2'
  const body = {
    "resource": "NLS.EventResource",
    "action": "list",
    "fields": {
      "title": true,
      "description": true,
      "slug": true
    }
  }
  const response = await axios.post(serverUrl, body)
  return response.data[0]
}
