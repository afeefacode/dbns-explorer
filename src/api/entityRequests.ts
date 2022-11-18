import {getOfferList} from 'src/utils'

const offerFields = {
  "title": true,
  "short_description": true,
  "description": true,
  "property_list": true,
  "costs": true,
  "requirements": true,
  "curriculum": true,
  "free": true,
  "child_friendly": true,
  "accessible": true,
  "climate_protection": true,
  "event_online": true,
  "event_canceled": true,
  "target_group": true,
  "info_url": true,
  "video_url": true,
  "updated_at": true,
  "offer_type": {
    "key": true
  },
  "actor": {
    "title": true
  }
}

const offerRequests: object = {}

getOfferList().forEach(({key, id}) => {
  //@ts-ignore
  offerRequests[`${key}s`] = {
    list: {
      "resource": "NLS.OfferResource",
      "action": "list",
      "fields": {...offerFields},
      "filters": {
        "offer_type_id": id
      },
    },
    details: {
      "resource": "NLS.OfferResource",
      "action": "get",
      "fields": {...offerFields},
      "filters": {
        "offer_type_id": id
      },
    }
  }
})

export const entityRequests = {
  actors: {
    list: {
      "resource": "NLS.ActorResource",
      "action": "list",
      "fields": {
        "title": true,
        "description": true,
        "slug": true,
        "info_url": true,
        "locations": {
          "title": true,
          "street": true,
          "city": true,
          "zip": true,
          "lat": true,
          "long": true
        }
      }
    },
    details: {}
  },
  ...offerRequests
}
