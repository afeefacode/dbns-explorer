var iFrame = document.getElementById('iframe-dbns-explorer');

function resizeIframe(newHeight) {
  iFrame.height = newHeight;
}

window.addEventListener('message', function (event) {
  if (event.origin !== '${host}') {
    // return;
  }

  switch (event.data.type) {
    case 'app_mounted':
      var acknowledgedMessage = {
        'type': 'app_mounted_acknowledged',
        'windowLocation': {
          search: window.location.search,
          origin: window.location.origin,
          pathname: window.location.pathname,
        }
      };
      iFrame.contentWindow.postMessage(acknowledgedMessage, '*');
      if (window.location.search) window.history.pushState({}, null, window.location.origin + window.location.pathname)
      break;

    case 'app_resized':
      resizeIframe(event.data.payload + 150);
      break;

    case 'copy_to_clipboard':
      navigator.clipboard.writeText(event.data.payload)
      break;

    //TODO: this is not working properly!
    case 'scroll_to_top_of_iframe':
      window.scrollTo(0, iFrame.getBoundingClientRect().top);
      break;

    // case "update_url":
    //     const payload = event.data.payload
    //     window.location.href = "?entity=" + payload.entityType + "s&id=" + payload.entityId
    //   break;

    default:
      break;
  }
});
