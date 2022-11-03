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
      return numerus === 'singular' ? 'Akteur' : 'Akteure'
    case 'project':
    case 'projects':
      return numerus === 'singular' ? 'Projekt' : 'Projekte'
    case 'event':
    case 'events':
      return numerus === 'singular' ? 'Veranstaltung' : 'Veranstaltungen'
    case 'job':
    case 'jobs':
      return numerus === 'singular' ? 'Job' : 'Jobs'
    case 'education':
    case 'educations':
      return numerus === 'singular' ? 'Bildungsangebot' : 'Bildungsangebote'
    case 'consultation':
    case 'consultations':
      return numerus === 'singular' ? 'Beratung' : 'Beratungen'
    case 'shop':
    case 'shops':
      return numerus === 'singular' ? 'Filiale' : 'Filialen'
    default:
      return entityName.toUpperCase()
  }
}
