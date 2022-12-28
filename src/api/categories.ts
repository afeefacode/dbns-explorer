import axios from "axios";

// TODO: all api requests can probably be abstracted to one request with changing bodies

export const fetchCategoryList = async () => {

  const requestBody = {
    "resource": "NLS.CategoryTypeResource",
    "action": "list",
    "fields": {
      "target_type": true,
      "title": true,
      "categories": {
        "title": true,
        "description": true,
        "sub_categories": true
      }
    }
  }

  const serverUrl = 'https://daten.nachhaltiges-sachsen.de/api/v2'
  const response = await axios.post(serverUrl, requestBody)
  return response.data.data
}

