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

