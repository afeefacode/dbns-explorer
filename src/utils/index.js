export const shortenStringTo = (characters, string) => string.length > characters ? string.slice(0, characters - 4) + ' ...' : string
export const triggerIframeResize = () => {
  // https://stackoverflow.com/questions/25098021/securityerror-blocked-a-frame-with-origin-from-accessing-a-cross-origin-frame
  const appHeight = document.getElementById('q-app').scrollHeight
  window.parent.postMessage(appHeight, '*')
}
