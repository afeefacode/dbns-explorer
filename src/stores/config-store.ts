import {defineStore} from 'pinia';
import {fetchConfig} from "src/api/config";

export const useConfigStore = defineStore('config', {
  state: () => {
    return {
      config: null
    }
  },
  getters: {},
  actions: {
    async getConfig() {
      console.log('getting config')
      try {
        this.config = await fetchConfig()
      } catch (e) {
        console.error(e)
        return e
      }
    },
  },
});
