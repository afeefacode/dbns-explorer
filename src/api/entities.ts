import axios from "axios";
import moment from 'moment'
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
      // TODO: consider adding these filters for actors again
      // if (tradeCategories) categories.push(tradeCategories.id)
      // if (tradeTypes) categories.push(tradeTypes.id)
      if (productTypes) categories.push(productTypes.id)
      break;

    default:
      break;
  }

  // let boundingBox = {}
  // if (withBounds) {
  //   // TODO: expand boundingBox by 50%
  //   // const boxWidth = activeFilters.boundingBox.ne.long - activeFilters.boundingBox.sw.long
  //   // const boxHeight = activeFilters.boundingBox.ne.lat - activeFilters.boundingBox.sw.lat
  //   // console.log(boxHeight, boxWidth)
  //   // boundingBox = {
  //   //   boundingBox: {
  //   //     ne: {
  //   //       lat: activeFilters.boundingBox.ne.lat - boxHeight / 2,
  //   //       long: activeFilters.boundingBox.ne.long + boxWidth / 2,
  //   //     },
  //   //     sw: {
  //   //       lat: activeFilters.boundingBox.sw.lat - boxHeight / 2,
  //   //       long: activeFilters.boundingBox.sw.long + boxWidth / 2,
  //   //     }
  //   //   }
  //   // }
  //   // console.log('boundingBox', boundingBox.boundingBox)
  //   boundingBox = {
  //     boundingBox: activeFilters.boundingBox
  //   }
  // }

  const boundingBox = withBounds ? {
      boundingBox: activeFilters.boundingBox
    }
    : {}

  const requestBody = {
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
      categories,
      timespan: startDate || endDate ? [
        startDate ? moment(startDate, 'DD.MM.YYYY').format('YYYY-MM-DD') : null,
        endDate ? moment(endDate, 'DD.MM.YYYY').format('YYYY-MM-DD') : null
      ] : undefined
    }
  }

  const serverUrl = 'https://daten.nachhaltiges-sachsen.de/api/v2'
  const response = await axios.post(serverUrl, requestBody)
  // console.log('request', JSON.stringify(requestBody))
  // console.log('response', response.data.data)
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
