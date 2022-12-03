import axios from "axios";
import {entityRequests} from "src/api/entityRequests";
import {getOfferList} from "src/utils";

export const fetchEntityList = async (entityType: string, activeFilters: {}) => {
  let filters = {}
  let requestBody = {}
  requestBody = {
    //@ts-ignore
    ...entityRequests[entityType].list,
    ...filters
  }

  switch (entityType) {
    case 'actors':
      requestBody = {
        ...entityRequests.actors.list,
        ...filters
      }
      break;
    case 'projects':
      break;
    case 'events':
      break;
    case 'educations':
      break;
    case 'counselings':
      break;
    case 'stores':
      break;
    default:
      break;
  }

  const serverUrl = 'https://daten.nachhaltiges-sachsen.de/api/v2'
  const response = await axios.post(serverUrl, requestBody)
  return response.data.data
}

export const fetchEntityDetails = async (entityType: string, id: string | string[]) => {
  // @ts-ignore
  const entityRequest = entityRequests[entityType].details

  const params = {
    "params": {
      "id": id
    }
  }

  const serverUrl = 'https://daten.nachhaltiges-sachsen.de/api/v2'
  const response = await axios.post(serverUrl, {...entityRequest, ...params})
  return response.data
}

export const fetchActorOffers = async (actorId: string | string[]) => {
  const serverUrl = 'https://daten.nachhaltiges-sachsen.de/api/v2'
  let offerList = {}

  const fetchOffers = async (offerType: { id: number }) => {
    const filters = {
      "filters": {
        "offer_type_id": offerType.id,
        "actor_id": actorId
      }
    }

    // @ts-ignore
    const entityRequest = entityRequests[offerType.key + 's'].list
    const response = await axios.post(serverUrl, {...entityRequest, ...filters})
    if (response.data.data.length) {
      // @ts-ignore
      offerList[offerType.key + 's'] = response.data.data
    }
  }

  const offerTypes = getOfferList()
  for (let i = 0; i < offerTypes.length; i++) {
    // @ts-ignore
    await fetchOffers(offerTypes[i])
  }
  return offerList
}
