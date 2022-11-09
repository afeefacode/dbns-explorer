import {defineStore} from 'pinia';

export const useConfigStore = defineStore('config', {
  state: () => {
    return {
      config: null
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
