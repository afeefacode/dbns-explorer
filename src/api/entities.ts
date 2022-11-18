import axios from "axios";
import {entityRequests} from "src/api/entityRequests";
import {getOfferList} from "src/utils";

export const fetchEntityList = async (requestBody: object) => {
  const serverUrl = 'https://daten.nachhaltiges-sachsen.de/api/v2'
  const response = await axios.post(serverUrl, requestBody)
  return response.data
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
    // console.log('{...entityRequest, ...filters}', {...entityRequest, ...filters})

    offerList = {
      ...offerList,
      ...response.data
    }
  }

  console.log('offerList', offerList)

  const offerTypes = getOfferList()
  // @ts-ignore
  offerTypes.forEach(offerType => fetchOffers(offerType))
  return offerList
}
