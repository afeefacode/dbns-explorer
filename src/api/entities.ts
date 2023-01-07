import axios from "axios";
import {entityRequests} from "src/api/entityRequests";
import {getOfferList} from "src/utils";

export const fetchEntityList = async (entityType: string, activeFilters: any, withBounds: boolean = false) => {

  const {main, actors, events, stores} = activeFilters
  const {region, category, search} = main
  const {orgTypes} = actors
  const {startDate, endDate} = events
  const {tradeCategories, tradeTypes, productTypes} = stores

  let resource = entityType === 'actors'
    ? 'NLS.ActorResource'
    : 'NLS.OfferResource'
  let categories = []

  if (region) categories.push(region.id)
  if (category) categories.push(category.id)

  switch (entityType) {
    case 'actors':
      if (orgTypes) categories.push(orgTypes.id)
      break;

    case 'events':
      break;

    case 'stores':
      // if (tradeCategories) categories.push(tradeCategories.id)
      // if (tradeTypes) categories.push(tradeTypes.id)
      if (productTypes) categories.push(productTypes.id)
      break;

    default:
      break;
  }

  const boundingBox = withBounds ? {
      boundingBox: activeFilters.boundingBox
    }
    : {}

  const newRequestBody = {
    resource,
    action: 'list',
    fields: {
      //@ts-ignore
      ...entityRequests[entityType].list.fields
    },
    filters: {
      q: search?.trim(),
      ...boundingBox,
      //@ts-ignore
      ...entityRequests[entityType].list.filters,
      categories
    }
  }

  const serverUrl = 'https://daten.nachhaltiges-sachsen.de/api/v2'
  const response = await axios.post(serverUrl, newRequestBody)
  console.log(JSON.stringify(boundingBox))
  console.log(entityType, response.data.data.length)
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
