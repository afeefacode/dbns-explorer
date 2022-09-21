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
      try {
        this.config = await fetchConfig()
      } catch (e) {
        console.error(e)
        return e
      }
    },
  },
});
