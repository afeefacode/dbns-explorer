export const shortenStringTo = (characters: number, string: string) => {
  return string.length > characters ? string.slice(0, characters - 4) + ' ...' : string
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

export const getGermanEntityName = (entityName: string, numerus: 'singular' | 'plural') => {
  switch (entityName.toLowerCase()) {
    case 'actor':
    case 'actors':
    case 'nls.actor':
      return numerus === 'singular' ? 'Akteur' : 'Akteure'
    case 'project':
    case 'projects':
    case 'nls.project':
      return numerus === 'singular' ? 'Projekt' : 'Projekte'
    case 'event':
    case 'events':
    case 'nls.event':
      return numerus === 'singular' ? 'Veranstaltung' : 'Veranstaltungen'
    case 'education':
    case 'educations':
    case 'nls.education':
      return numerus === 'singular' ? 'Bildungsangebot' : 'Bildungsangebote'
    case 'counseling':
    case 'counselings':
    case 'nls.counseling':
      return numerus === 'singular' ? 'Beratung' : 'Beratungen'
    case 'store':
    case 'stores':
    case 'nls.store':
      return numerus === 'singular' ? 'Filiale' : 'Filialen'
    default:
      return entityName.toUpperCase()
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
