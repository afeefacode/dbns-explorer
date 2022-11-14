export const request = {
  actors: {
    list: {
      "resource": "NLS.ActorResource",
      "action": "list",
      "fields": {
        "title": true,
        "description": true,
        "slug": true,
        "info_url": true,
        "locations": true
      }
    },
    details: {}
  },
  projects: {
    list: {
      "resource": "NLS.OfferResource",
      "action": "list",
      "fields": {
        "title": true,
        "short_description": true,
        "offer_type_id": true,
        "offer_type": {
          "display_name": true
        },
      },
      "filters": {
        "offer_type_id": 4
      },
    },
    details: {}
  },
  events: {
    list: {
      "resource": "NLS.OfferResource",
      "action": "list",
      "fields": {
        "title": true,
        "short_description": true,
        "offer_type_id": true,
        "offer_type": {
          "display_name": true
        },
      },
      "filters": {
        "offer_type_id": 3
      },
    },
    details: {}
  },
  categories: {
    list: {
      "resource": "NLS.CategoryResource",
      "action": "list",
      "fields": {
        "title": true,
        "description": true,
        "sub_categories": true,
      }
    }
  }

}
