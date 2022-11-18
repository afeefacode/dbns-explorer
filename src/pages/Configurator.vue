<template>
  <div class="page-container q-ma-xl">
    <h3>full_widget</h3>
    <div>{{getSnippet(full_widget, host)}}</div>
    <h3>upcoming_lvns_events</h3>
    <div>{{getSnippet(upcoming_lvns_events, host)}}</div>
    <h3>all_lvns_events</h3>
    <div>{{getSnippet(all_lvns_events, host)}}</div>
    <h3>all_events</h3>
    <div>{{getSnippet(all_events, host)}}</div>
  </div>
</template>
<script setup>
import {config as full_widget} from 'src/assets/configs/lvns/full_widget'
import {config as upcoming_lvns_events} from 'src/assets/configs/lvns/upcoming_lvns_events'
import {config as all_lvns_events} from 'src/assets/configs/lvns/all_lvns_events'
import {config as all_events} from 'src/assets/configs/all_events'
import {configJsonToUrlParam} from 'src/utils'

// const host = 'http://localhost:9000'
const host = 'https://dbns-explorer.netlify.app'

const getSnippet = (config, host) => {
  return `<style>
  #iframe-dbns-explorer {
    width: 100%;
    max-width: 100%;
    min-height: 500px;
    border: 0px dashed #ddd;
  }

  .wp-block-spacer, .wp-block-separator {
    display: none;
  }
</style>
<iframe id="iframe-dbns-explorer" title="Aktiv in Sachsen" src="${host}/?${configJsonToUrlParam(config)}"></iframe>
<script>
  var iFrame = document.getElementById('iframe-dbns-explorer');

  function resizeIframeDbnsExplorer(newHeight) {
    iFrame.height = newHeight;
  };

  window.addEventListener("message", function (event) {
    if (event.origin !== "${host}") {
      return;
    };

    switch (event.data.type) {
      case "app_mounted":
        var acknowledgedMessage = {
          "type": "app_mounted_acknowledged",
          "payload": window.location.search
        };
        iFrame.contentWindow.postMessage(acknowledgedMessage, "*");
        break;

      case "app_resized":
        resizeIframeDbnsExplorer(event.data.payload);
        break;

      default:
        break;
    }
  });<\/script>`
}
</script>
