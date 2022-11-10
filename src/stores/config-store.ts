import {defineStore} from 'pinia';
import {config as full_widget} from 'src/assets/configs/lvns/full_widget'

export const useConfigStore = defineStore('config', {
  state: () => {
    return {
      config: full_widget
    }
  },
  actions: {
    getConfigFromUrl() {
      const configString = (new URL(window.location.href)).searchParams.get('config')
      if (configString) {
        this.config = JSON.parse(decodeURI(configString))
      }
    }
  }
})
