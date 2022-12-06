export const shortenStringTo = (characters: number, string = '') => {
  return string?.length > characters ? string.slice(0, characters - 4) + ' ...' : string
}

export const getSearchParameters = (paramString: string) => {
  const transformToAssocArray = (paramString: string) => {
    let params: { [index: string]: string } = {};
    const paramArray: string[] = paramString.split("&");
    for (let i = 0; i < paramArray.length; i++) {
      const temp = paramArray[i].split("=");
      params[temp[0]] = temp[1];
    }
    return params;
  }
  return paramString != null && paramString != "" ? transformToAssocArray(paramString) : {};
}

export const getGermanEntityName = (entityName: string, mode: 'singular' | 'plural' | 'category') => {
  switch (entityName.toLowerCase()) {
    case 'actor':
    case 'actors':
    case 'nls.actor':
      return mode === 'singular' ? 'Akteur' : 'Akteure'
    case 'project':
    case 'projects':
    case 'nls.project':
      return mode === 'singular' ? 'Projekt' : 'Projekte'
    case 'event':
    case 'events':
    case 'nls.event':
      return mode === 'singular' ? 'Veranstaltung' : 'Veranstaltungen'
    case 'education':
    case 'educations':
    case 'nls.education':
      switch (mode) {
        case "singular":
          return 'Bildungsangebot'
        case "plural":
          return 'Bildungsangebote'
        case "category":
          return 'Bildung'
      }
      break;
    case 'counseling':
    case 'counselings':
    case 'nls.counseling':
      switch (mode) {
        case "singular":
          return 'Beratungsangebot'
        case "plural":
          return 'Beratungsangebote'
        case "category":
          return 'Beratung'
      }
      break;
    case 'store':
    case 'stores':
    case 'nls.store':
      switch (mode) {
        case "singular":
          return 'Filiale'
        case "plural":
          return 'Filialen'
        case "category":
          return 'Handel'
      }
      break;
    default:
      return capitalizeFirstLetter(entityName)
  }
}

export const configJsonToUrlParam = (json: object) => {
  const string = JSON.stringify(json)
  return 'config=' + encodeURI(string)
}

export const triggerIframeResize = () => {
  const appHeight = document.getElementById('q-app')!.scrollHeight
  const resizeMessage = {
    type: "app_resized",
    payload: appHeight
  }
  window.parent.postMessage(resizeMessage, '*')
}

export const getEntityList = () => {
  return ['actor', 'counseling', 'education', 'event', 'project', 'store']
}

export const getOfferList = (mode = "verbose") => {
  switch (mode) {
    case "flat":
      return ['counseling', 'education', 'event', 'project', 'store']
    case "verbose":
    default:
      return [
        {key: 'counseling', id: 1},
        {key: 'education', id: 2},
        {key: 'event', id: 3},
        {key: 'project', id: 4},
        {key: 'store', id: 5},
      ]
  }
}

export const getTypeFromEntity = (entity: any) => {
  let entityType = ''
  switch (entity.type) {
    case 'NLS.Actor':
      entityType = 'actor'
      break;
    case 'NLS.Offer':
      entityType = entity.offer_type.key
      break;
    default:
      entityType = 'offer'
  }
  return entityType
}

export const inIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

export const debounce = (callback: () => {}, timeout = 300) => {
  let timer: any;
  return (...args: []) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, timeout);
  };
}

export const appendFiltersToRequest = (request: { filters: {} }, filters: {}) => {
  return {
    ...request,
    filters: {
      ...request.filters,
      ...filters
    }
  }
}


export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const prettifyUrl = (url: string) => {
  const http = 'http://'
  const https = 'https://'
  const slash = '/'

  let prettyUrl = ''

  if (url.startsWith(https))
    prettyUrl = url.slice(https.length);
  if (url.startsWith(http))
    prettyUrl = url.slice(http.length);
  if (prettyUrl.endsWith(slash))
    prettyUrl = prettyUrl.slice(0, prettyUrl.length - 1)

  return prettyUrl
}

export const isActiveEntity = (activeEntities: string[], entityType: string) => {
  return !!activeEntities.find(activeEntity => activeEntity === entityType)
}

export const addToArrayOrRemove = (array: string [], element: string) => {
  if (isActiveEntity(array, element)) {
    const index = array.findIndex(activeEntity => activeEntity === element)
    array.splice(index, 1)
  } else {
    array.unshift(element)
  }
  return array
}

export const hasLatLong = (entity: any) => {
  return entity.locations[0]?.lat && entity.locations[0]?.long
}
