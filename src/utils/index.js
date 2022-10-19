export const shortenStringTo = (characters, string) => string.length > characters ? string.slice(0, characters - 4) + ' ...' : string
export const triggerIframeResize = () => {
  const appHeight = document.getElementById('q-app').scrollHeight
  window.parent.postMessage(appHeight, '*')
}
